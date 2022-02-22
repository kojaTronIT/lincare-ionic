import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent {

  constructor(private router: Router, private alertController: AlertController, private appComponent: AppComponent) {}
  
  selectedRadioGroup: any;

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
      alert("No products selected" + "\nPlease select at least one item")
    } else if (result[0] == "cylinders") {
      this.router.navigate(['/amount-picker']);
      console.log(result);
    } else {
      console.log(result)
    }
    
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
