import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonDatetime, AlertController, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AppComponent } from '../app.component';
import { HomeServiceService } from './home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonDatetime, { static: false }) datetime: IonDatetime;

  dateValue = '';
  zipValue = '';

  submitted = false;
  zipcodeValidation = false;

  currentDate;
  zipResponse;

  submitCount = 0;

  public userCode;

  private zipcodePattern = RegExp(/^[0-9]{5}$/g);

  public errorMessages = {
    dateOfBirth: [
      { type: 'required', message: 'Date of birth is required to continue' }
    ],
    zipcode: [
      { type: 'required', message: 'Zip code is required to continue' },
      { type: 'pattern', message: 'Zip code must be in the form of 5 digits' }
    ]
  }

  constructor(
    private formBuilder: FormBuilder, private alertController: AlertController,
    private router: Router, private homeService: HomeServiceService,
    private activeRoute: ActivatedRoute, private loadingController: LoadingController,
    private appComponent: AppComponent
  ) { }

  async ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {

      this.userCode = params.user_code;

      console.log(this.userCode);
    });

    this.validateUrl();

    this.currentDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
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

  formatDate(value: string) {
    console.log(format(parseISO(value), "MM/dd/yyyy"));
    return format(parseISO(value), "MM/dd/yyyy");
  }

  confirmDate() {
    if (this.dateValue === '') {
      this.dateValue = "01/01/1940"
    }
    this.datetime.confirm(true);
  }

  closeDatePicker() {
    this.datetime.cancel(true);
  }

  onDateChange(value) {
    this.dateValue = value;
  }

  onZipChange(value) {
    this.zipValue = value;

    this.validateZipcode();
  }

  onSubmit() {
    this.submitted = true;

    this.setUserActions("Submit clicked", "home-page");

    this.logActions();

    this.submitCount++

    if (this.submitCount > 3) {
      localStorage.setItem("messageKey", "THREEATTEMPTS"); //new message key for 3 attempts
      this.router.navigate(['/message']);
    }

    this.presendLoadingForDobAndZipValidation();
  }

  async onCancel() {
    this.setUserActions("Cancel clicked", "home-page");

    this.logActions();

    let alert = await this.alertController.create({
      message: 'Are you sure you want to cancel ?',
      cssClass: 'item-select-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.setUserActions("No on cancel clicked", "home-page");

            this.logActions();

          }
        },
        {
          text: 'Yes, Cancel',
          handler: () => {
            this.setUserActions("Yes on cancel clicked", "home-page");

            localStorage.setItem("messageKey", "CANCEL");

            this.router.navigate(['/message']);
          }
        }
      ]
    });

    alert.present();
  }

  validateUrl() {
    // this.appComponent.isOneTimeLinkValid(true);

    this.homeService.validateUrl(this.userCode).subscribe({
      next: () => {
        this.appComponent.isOneTimeLinkValid(true);
        console.log(this.userCode + " GOOD " + this.appComponent.isOneTimeLinkValid);
      },
      error: (error) => {
        this.appComponent.isOneTimeLinkValid(false);
        console.log(this.userCode + " BAD " + this.appComponent.isOneTimeLinkValid);
        localStorage.setItem("messageKey", error.error), this.router.navigate(['/message']);
      }
    });
  }

  setUserActions(action: string, actionLocation: string) {
    localStorage.setItem("action", action);
    localStorage.setItem("actionLocation", actionLocation);
  }

  logActions() {
    this.homeService.logUserActions(
      localStorage.getItem("action"), localStorage.getItem("actionLocation"), localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })
  }

  validateZipcode() {
    if (this.zipValue.length === 5) {
      this.homeService.validateZip(this.zipValue).subscribe({
        next: (data) => {
          console.log(data, data.length),
            this.zipResponse = data
          if (!(data.length === 0)) {
            this.zipcodeValidation = true;
          } else {
            this.zipcodeValidation = false;
          }
          console.log(this.zipcodeValidation)
        },
        error: (error) => console.log(error.message)
      })
    }
  }

  async presendLoadingForDobAndZipValidation() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      message: 'Evaluating patient data ...',
      translucent: true,
      cssClass: 'loading-patient-data',
    });

    if (this.submitCount >= 0 && this.submitCount <= 3) {
      await loading.present();
    }

    this.homeService.validateDobAndZip(this.registrationForm.value.dateOfBirth, this.registrationForm.value.zipcode, this.userCode).subscribe({
      next: (data) => {

        this.router.navigate(['/address-confirmation'],
          {
            state: {
              street: data.street,
              apartment: data.apartment,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode
            }
          });

        loading.dismiss();
      },
      error: (error) => {
        loading.dismiss();
        this.router.navigate(['/message']);
        localStorage.setItem("messageKey", error.error);
      }
    });

  }

}
