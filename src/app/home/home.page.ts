import { formatDate} from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { IonDatetime, AlertController, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
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
  zipResponse;
  submitted = false;
  zipcodeValidation = false;

  currentDate;

  private zipcodePattern = RegExp(/^[0-9]{5}$/g);

  public errorMessages = {
    dateOfBirth: [
      { type: 'required', message: 'Date of birth is a mandatory field' }
    ],
    zipcode: [
      { type: 'required', message: 'Zipcode is a mandatory field' },
      { type: 'pattern', message: 'Zipcode must be 5 numbers long (example: 11000)' }
    ]
  }

  constructor(
    private formBuilder: FormBuilder, private alertController: AlertController, 
    private router: Router, private homeService: HomeServiceService, 
    private loadingController: LoadingController, private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {

      if(params.user_code == undefined) {
        localStorage.setItem("one_time_code", "empty")
      } else {
        localStorage.setItem("one_time_code", params.user_code);
      } 

      console.log(params.user_code + " ovo je url param");

      console.log(localStorage.getItem("one_time_code") + " ovo je local storage");
    });

    this.homeService.validateUrl(localStorage.getItem("one_time_code")).subscribe({
      next: (data) => console.log(data),
      error: (error) => { localStorage.setItem("messageKey", error.error), this.router.navigate(['/message']) }
    });

    this.currentDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    console.log(this.currentDate)
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
    console.log(format(parseISO(value), "dd/MM/yyyy"));
    return format(parseISO(value), "dd/MM/yyyy");
  }

  confirmDate() {
    if (this.dateValue == '') {
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

    if(this.zipValue.length == 5) {
      this.homeService.validateZip(this.zipValue).subscribe({
        next: (data) => {
          console.log(data, data.length),
            this.zipResponse = data
          if (!(data.length == 0)) {
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

  onSubmit() {
    this.submitted = true;
    localStorage.setItem("action", "Submit clicked")
    localStorage.setItem("actionLocation", "home-page")
    this.router.navigate(['/address-confirmation'])

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
      ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    this.homeService.validateDobAndZip(this.dateValue, this.zipValue, localStorage.getItem("one_time_code")).subscribe({
      next: (data) => { this.router.navigate(['/address-confirmation']), localStorage.setItem("shipping_address", JSON.stringify(data)) },
      error: (error) => { this.router.navigate(['/message']), localStorage.setItem("message", error.error) }
      }) 

    console.log(this.registrationForm.value);
  }

  async onCancel() {
    localStorage.setItem("action", "Cancel clicked");
    localStorage.setItem("actionLocation", "home-page");

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    let alert = await this.alertController.create({
      message: 'Are you sure you want to cancel ?',
      cssClass: 'item-select-alert',
      buttons: [
        {
          text: 'Deny',
          role: 'cancel',
          handler: () => {
            localStorage.setItem("action", "Deny cancelation clicked");
            localStorage.setItem("actionLocation", "home-page");

            this.homeService.logUserActions(
              localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
            ).subscribe({
              next: (data) => console.log(data),
              error: (error) => console.log(error.error)
            })
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            localStorage.setItem("action", "Confirm cancelation clicked");
            localStorage.setItem("actionLocation", "home-page");

            localStorage.setItem("messageKey", "CANCEL");

            this.router.navigate(['/message']);
          }
        }
      ]
    });

    alert.present();
  }

}
