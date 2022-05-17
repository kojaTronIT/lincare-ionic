import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent implements OnInit {

  selectedRadioGroup: any;

  actionLocation = "item-select";

  constructor(
    private router: Router, private alertController: AlertController, 
    private appComponent: AppComponent, private homeService: HomeServiceService
  ) {}

  ngOnInit() { }

  radioGroupChange(event, index: number) {
    console.log("radioGroupChange", event.detail)
    if(event.detail.checked === true) {
      this.appComponent.item_select_list[index].checked = true;
    } else {
      this.appComponent.item_select_list[index].checked = false;
    }
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }

  radioBlur() {
    console.log("radioBlur");
  }

  onSubmit() {
    this.appComponent.logActions("Submit clicked", this.actionLocation);

    const result = this.appComponent.item_select_list.filter(obj => obj.checked === true).map(obj => obj.value);

    this.sendOrder(result);
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

  sendOrder(orderResult) {
    if (this.selectedRadioGroup === undefined || orderResult.length === 0) {
      alert("To continue at least one item must be selected")
    } else if (orderResult[0] === "cylinders") {
      this.router.navigate(['/amount-picker'], { state: { order: orderResult } });
    } else {
      this.homeService.sendOrder(orderResult).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      });
      this.router.navigate(['/delivery-date'])
    }
  }

}
