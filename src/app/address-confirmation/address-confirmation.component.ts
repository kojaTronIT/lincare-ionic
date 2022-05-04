import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-address-confirmation',
  templateUrl: './address-confirmation.component.html',
  styleUrls: ['./address-confirmation.component.scss'],
})
export class AddressConfirmationComponent implements OnInit {

  patientName: any;
  street: any;
  apartment: any;
  city: any;
  state: any;
  zipCode: any;

  attributes: any;

  actionLocation = "address-confirmation";

  constructor(private router: Router, private appComponent: AppComponent) {

    try {

      this.street = this.router.getCurrentNavigation().extras.state.street;
      this.apartment = this.router.getCurrentNavigation().extras.state.apartment;
      this.city = this.router.getCurrentNavigation().extras.state.city;
      this.state = this.router.getCurrentNavigation().extras.state.state;
      this.zipCode = this.router.getCurrentNavigation().extras.state.zipCode;

    } catch (error) {
      this.router.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });
    }
    
   }

   ngOnInit() {
    
   }

  onYes() {
    this.appComponent.logActions("Yes clicked", this.actionLocation);

    this.router.navigate(['/item-select'])
  }

  onNo() {
    this.appComponent.setUserActions("No clicked", this.actionLocation);

    localStorage.setItem("messageKey", "NO");

    this.router.navigate(['/message']);
  }

}
