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

  constructor(private router: Router, private alertController: AlertController, 
    private appComponent: AppComponent, private homeService: HomeServiceService) { }

  selectedAmount: any;

  order_data: Array<Object> = [];

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
    console.log(localStorage.getItem("order_items"));
  }

  selectChange(event) {
    console.log("selectChange", event.detail);
    this.selectedAmount = event.detail.value;
  }

  onSubmit() {
    localStorage.setItem("action", "Submit clicked");
    localStorage.setItem("actionLocation", "ammount-picker")

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    const result = this.appComponent.item_select_list.filter(obj => obj.checked == true).map(obj => obj.value);
    this.order_data.push(result, this.selectedAmount);
    console.log(this.order_data);
  }

  onBack() {
    localStorage.setItem("action", "Back clicked");
    localStorage.setItem("actionLocation", "ammount-picker")

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    this.router.navigate(['/item-select'])
  }

  async onCancel() {
    localStorage.setItem("action", "Cancel clicked");
    localStorage.setItem("actionLocation", "ammount-picker");

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
            localStorage.setItem("actionLocation", "ammount-picker");

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
            localStorage.setItem("actionLocation", "ammount-picker")
            
            localStorage.setItem("messageKey", "CANCEL");
            
            this.router.navigate(['/message'])  
          }
        }
      ]
    });

    alert.present();
  }

}
