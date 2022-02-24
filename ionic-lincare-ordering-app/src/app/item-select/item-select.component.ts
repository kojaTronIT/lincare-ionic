import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController  } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent {

  constructor(private router: Router, private alertController: AlertController, private appComponent: AppComponent,
    private toastController: ToastController) {}
  
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
            console.log('Okay clicked');
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
    const result = this.appComponent.item_select_list.filter(obj => obj.checked == true).map(obj => obj.value);

    if (this.selectedRadioGroup == undefined || result.length == 0) {
      this.presentToastWithOptions();
      // alert("No products selected" + "\nPlease select at least one item")
    } else if (result[0] == "cylinders") {
      this.router.navigate(['/amount-picker']);
      console.log(result);
    } else {
      console.log(result)
    }
    
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
