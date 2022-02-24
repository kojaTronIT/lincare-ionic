import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, AlertController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AppComponent } from '../app.component';
import { HomeServiceService } from './home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public errorMessages = {
    dateOfBirth: [
      { type: 'required', message: 'Date of birth is a mandatory field' },
      { type: 'pattern', message: 'Date should be in dd/mm/yyyy format (example: 19/05/1998)' }
    ],
    zipcode: [
      { type: 'required', message: 'Zipcode is a mandatory field' },
      { type: 'pattern', message: 'Zipcode must be 5 numbers long (example: 11000)' }
    ]
  }

  @ViewChild(IonDatetime, { static: false }) datetime: IonDatetime;

  dateValue = '';
  zipValue = '';
  submitted = false;

  // date regex dd/mm/yyyy 1900-2999
  // private dateOfBirthPattern = RegExp(/^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/g);
  private zipcodePattern = RegExp(/^[0-9]{5}$/g);

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router, private homeService: HomeServiceService, private appComponent: AppComponent) { }

  formatDate(value: string) {
    console.log(format(parseISO(value), "dd/MM/yyyy"));
    return format(parseISO(value), "dd/MM/yyyy");
  }

  confirm() {
    if(this.dateValue == '') {
      this.dateValue = "01/01/1940"
    }
    this.datetime.confirm(true);
  }

  //.find first in list that matches
  // checkZip(value) {
  //   // if (this.check_zipcode.find((code) => {
  //   //   return code === value
  //   // })) {
  //   //   alert("OK")
  //   // } else {
  //   //   alert("NOT OK")
  //   // }
    
  // }

  close() {
    this.datetime.cancel(true);
  }

  onChange(value) {
    this.dateValue = value;
  }

  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }

  get zipcode() {
    return this.registrationForm.get('zipcode');
  }

  registrationForm = this.formBuilder.group({
    dateOfBirth: ['', [Validators.required]],
    zipcode: ['', [Validators.required, Validators.pattern(this.zipcodePattern)]]
  });

  onSubmit(value) {
    this.submitted = true;
    this.zipValue = value;
    console.log(this.zipValue);
    this.homeService.validateZip(this.dateValue).subscribe({
      next: (data) => {if (data) {this.homeService.validateDobAndZip(this.dateValue, this.zipValue).subscribe({
        next: () => console.log("ok"),
        error: (data) => console.log(data)
      })}},
      error: (error) => error.message
    })
    console.log(this.registrationForm.value);
    alert("Submit clicked, waiting for further logic to be implemented")
  }

  async onCancel() {
    let alert = await this.alertController.create({
      header: 'Exiting the page !',
      message: 'Are you sure you want to continue ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.appComponent.message = "You have canceled your request";
            this.router.navigate(['/message'])
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
