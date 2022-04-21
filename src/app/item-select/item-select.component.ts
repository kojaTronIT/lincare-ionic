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

  ngOnInit() { }
  
  selectedRadioGroup: any;

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
    localStorage.setItem("action", "Submit clicked");
    localStorage.setItem("actionLocation", "item-select");

    this.homeService.logUserActions(
      localStorage.getItem("action"), localStorage.getItem("actionLocation"), localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    const result = this.appComponent.item_select_list.filter(obj => obj.checked == true).map(obj => obj.value);

    localStorage.setItem("order_items", JSON.stringify(result));

    if (this.selectedRadioGroup === undefined || result.length === 0) {
      alert("To continue at least one item must be selected")
    } else if (result[0] === "cylinders") {
      console.log(localStorage.getItem("order_items")); //OVO IDE NA ORDER
      this.router.navigate(['/amount-picker']);
    } else {
      console.log(result) //OVO IDE NA ORDER
      this.router.navigate(['/delivery-date'])
    }
    
  }

  async onCancel() {
    localStorage.setItem("action", "Cancel clicked");
    localStorage.setItem("actionLocation", "item-select");

    this.homeService.logUserActions(
      localStorage.getItem("action"), localStorage.getItem("actionLocation"), localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    let alert = await this.alertController.create({
      message: 'Are you sure you want to cancel ?',
      cssClass: 'item-select-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            localStorage.setItem("action", "No on cancel clicked");
            localStorage.setItem("actionLocation", "item-select");

            this.homeService.logUserActions(
              localStorage.getItem("action"), localStorage.getItem("actionLocation"), localStorage.getItem("one_time_code")
            ).subscribe({
              next: (data) => console.log(data),
              error: (error) => console.log(error.error)
            })
          }
        },
        {
          text: 'Yes, Cancel',
          handler: () => {
            localStorage.setItem("action", "Yes on cancel clicked")
            localStorage.setItem("actionLocation", "item-select");
            
            localStorage.setItem("messageKey", "CANCEL");
            
            this.router.navigate(['/message'])
          }
        }
      ]
    });
    
    alert.present();
  }

}
