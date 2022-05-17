import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { __values } from 'tslib';
import { AppComponent } from '../app.component';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-amount-picker',
  templateUrl: './amount-picker.component.html',
  styleUrls: ['./amount-picker.component.scss'],
})
export class AmountPickerComponent implements OnInit {

  order: any;

  actionLocation = "ammount-picker";

  selectedAmountEmpty: number;
  selectedAmountFull: number;

  alertMessage: string;

  order_data: Array<Object> = [];

  constructor(
    private router: Router, private alertController: AlertController, 
    private homeService: HomeServiceService, private appComponent: AppComponent
  ) { 

    try {

      if (this.router.getCurrentNavigation().extras.state.order !== null) {
        this.order = this.router.getCurrentNavigation().extras.state.order;
      }
      
    } catch (error) {

      localStorage.setItem("messageKey", "CUSTOMMESSAGE");

      this.router.navigate(['/error']);

    }

  }

  amount_list = [
    {
      id: '1',
      value: 1,
      text: '1',
      checked: false
    },
    {
      id: '2',
      value: 2,
      text: '2',
      checked: false
    },
    {
      id: '3',
      value: 3,
      text: '3',
      checked: false
    },
    {
      id: '4',
      value: 4,
      text: '4',
      checked: false
    },
    {
      id: '5',
      value: 5,
      text: '5',
      checked: false
    },
    {
      id: '6',
      value: 6,
      text: '6',
      checked: false
    },
    {
      id: '7',
      value: 7,
      text: '7',
      checked: false
    },
    {
      id: '8',
      value: 8,
      text: '8',
      checked: false
    }
  ];

  ngOnInit() {
    console.log(localStorage.getItem("one_time_code"));
  }

  selectChangeEmpty(event) {
    this.selectedAmountEmpty = event.detail.value;
  }

  selectChangeFull(event) {
    this.selectedAmountFull = event.detail.value;
  }

  onSubmit() {
    this.appComponent.logActions("Submit clicked", this.actionLocation);

    if (!(this.selectedAmountEmpty > 0 && this.selectedAmountFull > 0)) {

      alert("To continue an amount needs to be selected");

    } else {

      this.homeService.sendOrder(this.order, this.selectedAmountEmpty, this.selectedAmountFull).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      })

      this.router.navigate(['/delivery-date']);
    }

  }

  onBack() {
    this.appComponent.logActions("Back clicked", this.actionLocation);

    this.router.navigate(['/item-select'])
  }

  async onCancel() {
    this.appComponent.logActions("Cancel clicked", this.actionLocation);

    let alert = await this.alertController.create({
      message: 'Are you sure you want to cancel ?',
      cssClass: 'item-select-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.appComponent.logActions("No on cancel clicked", this.actionLocation);
          }
        },
        {
          text: 'Yes, Cancel',
          handler: () => {
            this.appComponent.setUserActions("Yes on cancel clicked", this.actionLocation);

            localStorage.setItem("messageKey", "CANCEL");

            this.router.navigate(['/message'])
          }
        }
      ]
    });

    alert.present();
  }

}
