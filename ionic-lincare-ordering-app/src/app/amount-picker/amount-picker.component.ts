import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-amount-picker',
  templateUrl: './amount-picker.component.html',
  styleUrls: ['./amount-picker.component.scss'],
})
export class AmountPickerComponent implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

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
            this.router.navigate(['/error'])
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }

  

}
