import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private homeService: HomeServiceService) {

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
    localStorage.setItem("action", "Yes clicked");
    localStorage.setItem("actionLocation", "address-confirmation")

    this.homeService.logUserActions(
      localStorage.getItem("action"), localStorage.getItem("actionLocation"), localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    this.router.navigate(['/item-select'])
  }

  onNo() {
    localStorage.setItem("action", "No clicked")
    localStorage.setItem("actionLocation", "address-confirmation");

    localStorage.setItem("messageKey", "NO");

    this.router.navigate(['/message']);
  }

}
