import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { __values } from 'tslib';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-amount-picker',
  templateUrl: './amount-picker.component.html',
  styleUrls: ['./amount-picker.component.scss'],
})
export class AmountPickerComponent implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private appComponent: AppComponent) { }

  ngOnInit() {
    console.log(this.appComponent.item_select_list);
  }

  selectedAmount: any;

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
    },
    {
      id: '9',
      value: 9,
      text: '9',
      checked: false
    },
    {
      id: '10',
      value: 10,
      text: '10',
      checked: false
    }
  ];

  data_list: Array<Object> = [];

  selectChange(event) {
    console.log("selectChange", event.detail);
    this.selectedAmount = event.detail.value;
  }

  onSubmit() {
    const result = this.appComponent.item_select_list.filter(obj => obj.checked == true).map(obj => obj.value);
    this.data_list.push(result, this.selectedAmount);
    console.log(this.data_list);
  }

  onBack() {
    this.router.navigate(['/item-select'])
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
