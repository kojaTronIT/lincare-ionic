import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent {

  constructor(private router: Router, private alertController: AlertController) {}
  
  selectedRadioGroup: any;

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'cylinders',
      checked: false,
      text: 'Oxygen cylinders'
    }, 
    {
      id: '2',
      name: 'radio_list',
      value: 'cannuals',
      checked: false,
      text: 'Cannuals'
    }, 
    {
      id: '3',
      name: 'radio_list',
      value: 'tubing',
      checked: false,
      text: 'Tubing'
    }
  ];

  indexTracker(index: number, value: any) {
    return index;
  }

  radioGroupChange(event, index: number) {
    console.log("radioGroupChange", event.detail)
    if(event.detail.checked == true) {
      this.radio_list[index].checked = true;
    } else {
      this.radio_list[index].checked = false;
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
    const result = this.radio_list.filter(obj => obj.checked == true).map(obj => obj.value);

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
            this.router.navigate(['/error'])
            console.log('Confirm clicked');
          }
        }
      ]
    });
    
    alert.present();
  }

}
