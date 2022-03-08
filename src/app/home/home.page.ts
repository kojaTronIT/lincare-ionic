import { formatDate} from '@angular/common';
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
export class HomePage implements OnInit{

  @ViewChild(IonDatetime, { static: false }) datetime: IonDatetime;

  dateValue = '';
  zipValue = '';
  zipResponse;
  submitted = false;
  zipcodeValidation;

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
    private router: Router, private homeService: HomeServiceService, private appComponent: AppComponent, 
    private loadingController: LoadingController, private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {

      console.log(params.user_code);

      this.homeService.validateUrl(params.user_code).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error.message)
      });
    })

    this.currentDate = formatDate(new Date, 'yyyy-MM-dd', 'en');
    console.log(this.currentDate)
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Confirming user data, please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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

    this.homeService.validateZip(this.zipValue).subscribe({
      next: (data) => { 
        console.log(data, data.length),
        this.zipResponse = data
        if(data.length == 0) {
          this.zipcodeValidation = false;
        } else {
          this.zipcodeValidation = true;
        }
        console.log(this.zipcodeValidation)
      },
      error: (error) => console.log(error.message)
    })
  }

  onSubmit() {
    this.submitted = true;

    // this.presentLoading();
    
    this.homeService.validateDobAndZip(this.dateValue, this.zipValue).subscribe({
        next: () => this.router.navigate(['/item-select']),
      error: (error) => { this.router.navigate(['/message']), this.appComponent.message = error.error }
      })

    console.log(this.registrationForm.value);
  }

  async onCancel() {
    let alert = await this.alertController.create({
      message: 'Are you sure you want to cancel ?',
      cssClass: 'item-select-alert',
      buttons: [
        {
          text: 'Deny',
          role: 'cancel',
          handler: () => {
            console.log('Deny clicked');
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