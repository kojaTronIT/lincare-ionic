import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent implements OnInit{

  constructor(private router: Router, private alertController: AlertController) {}

  
  
  selectedRadioGroup: any;

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'cylinders',
      checked: false,
      text: 'Oxygen cylinders',
      disabled: false,
      color: 'secondary'
    }, 
    {
      id: '2',
      name: 'radio_list',
      value: 'cannuals',
      checked: false,
      text: 'Cannuals',
      disabled: false,
      color: 'secondary'
    }, 
    {
      id: '3',
      name: 'radio_list',
      value: 'tubing',
      checked: false,
      text: 'Tubing',
      disabled: false,
      color: 'secondary'
    }
  ];

  ngOnInit() {
    console.log(this.radio_list);
  }

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.radio_list[0].checked = true;
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }

  radioBlur() {
    console.log("radioBlur");
  }

  onSubmit() {
    if (this.selectedRadioGroup === undefined) {
      alert("No products selected" + "\nPlease select at least one item")
    } else {
      switch (this.selectedRadioGroup.value) {
        case "cylinders":
          this.router.navigate(['/amount-picker']);
          break;

        case "cannuals":
          console.log("cannuals");
          break;

        case "tubing":
          console.log("tubing");
          break;

        case undefined:
          alert("No products selected" + "\nPlease select at least one item")
          break;  
      }
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
