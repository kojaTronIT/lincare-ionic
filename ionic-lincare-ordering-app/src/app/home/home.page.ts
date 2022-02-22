import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, AlertController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

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
      { type: 'pattern', message: 'Zipcode should be 5 numbers long (example: 11000)' }
    ]
  }

  @ViewChild(IonDatetime, { static: false }) datetime: IonDatetime;

  dateValue = '';

  // private dateOfBirthPattern = RegExp(/^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/g);
  private zipcodePattern = RegExp(/^[0-9]{5}$/g);

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router) { }

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

  onSubmit() {
    this.router.navigate(['/item-select'])
    console.log(this.registrationForm.value);
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
            this.router.navigate(['/message'])
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
