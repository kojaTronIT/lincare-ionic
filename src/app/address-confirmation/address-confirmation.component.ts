import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-address-confirmation',
  templateUrl: './address-confirmation.component.html',
  styleUrls: ['./address-confirmation.component.scss'],
})
export class AddressConfirmationComponent implements OnInit {

  constructor(private router: Router, private homeService: HomeServiceService) { }

  addressArray: any;

  ngOnInit() {
    this.addressArray = JSON.parse(localStorage.getItem("shiping_address"));
    console.log(localStorage.getItem("shiping_address"));
  }

  onYes() {
    localStorage.setItem("action", "Yes clicked");
    localStorage.setItem("actionLocation", "address-confirmation")

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
      ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

    this.router.navigate(['/item-select'])
    console.log("Yes clicked") //user voyage method
  }

  onNo() {
    localStorage.setItem("action", "No clicked")
    localStorage.setItem("actionLocation", "address-confirmation");
    localStorage.setItem("message", "Please contact your centre");
    this.router.navigate(['/message']);
  }

}
