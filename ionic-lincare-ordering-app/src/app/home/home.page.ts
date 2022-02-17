import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public errorMessages = {
    dateOfBirth: [
      {type: 'required', message: 'Date of birth is a mandatory field'},
      { type: 'pattern', message: 'Date should be in mm/dd/yyyy format (example: 05/19/1998)' }
    ],
    zipcode: [
      { type: 'required', message: 'Zipcode is a mandatory field' },
      { type: 'pattern', message: 'Zipcode should be 5 numbers long (example: 11000)' }
    ]
  }

  private dateOfBirthPattern = RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/g);
  private zipcodePattern = RegExp(/^[0-9]{5}$/g);

  // @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  // dateValue = '';

  constructor(private formBuilder: FormBuilder) { }

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

  // formatDate(value: string) {
  //   return format(parseISO(value), 'MM/dd/yyyy');
  // }

}
