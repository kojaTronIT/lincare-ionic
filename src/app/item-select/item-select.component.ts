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
export class ItemSelectComponent implements OnInit{

  constructor(private router: Router, private alertController: AlertController, 
    private appComponent: AppComponent, private toastController: ToastController, 
    private homeService: HomeServiceService) {}

  ngOnInit() {
  }
  
  selectedRadioGroup: any;

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Atleast one item needs to be selected',
      icon: 'information-circle',
      position: 'middle',
      color: 'primary',
      cssClass: 'item-select-toast',
      buttons: [
        {
          text: 'Continue',
          cssClass: 'toast-button',
          handler: () => {
            toast.dismiss;
            console.log('Continue clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  radioGroupChange(event, index: number) {
    console.log("radioGroupChange", event.detail)
    if(event.detail.checked == true) {
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
    localStorage.setItem("action", "Submit clicked");
    localStorage.setItem("actionLocation", "item-select");

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    const result = this.appComponent.item_select_list.filter(obj => obj.checked == true).map(obj => obj.value);

    localStorage.setItem("order_items", JSON.stringify(result));

    if (this.selectedRadioGroup == undefined || result.length == 0) {
      this.presentToastWithOptions();
    } else if (result[0] == "cylinders") {
      this.router.navigate(['/amount-picker']);
      console.log(localStorage.getItem("order_items"));
    } else {
      console.log(result)
    }
    
  }

  async onCancel() {
    localStorage.setItem("action", "Cancel clicked");
    localStorage.setItem("actionLocation", "item-select");

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
            localStorage.setItem("actionLocation", "item-select");

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
            localStorage.setItem("action", "Confirm cancelation clicked")
            localStorage.setItem("actionLocation", "item-select");
            this.homeService.displayMessageForAction("CANCEL").subscribe({
              next: (data) => localStorage.setItem("message", data.message),
              error: (error) => console.log(error.error)
            });
            
            this.router.navigate(['/message'])
          }
        }
      ]
    });
    
    alert.present();
  }

}
