import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  private dateOfBirthPattern = RegExp(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/g);
  private zipcodePattern = RegExp(/^[0-9]{5}$/g);

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router) { }

  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }

  get zipcode() {
    return this.registrationForm.get('zipcode');
  }

  registrationForm = this.formBuilder.group({
    dateOfBirth: [null, [Validators.required, Validators.pattern(this.dateOfBirthPattern)]],
    zipcode: [null, [Validators.required, Validators.pattern(this.zipcodePattern)]]
  });

  onSubmit() {
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
            this.router.navigate(['/error'])
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd/mm/yyyy');
  }

}
