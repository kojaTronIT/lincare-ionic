import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-address-confirmation',
  templateUrl: './address-confirmation.component.html',
  styleUrls: ['./address-confirmation.component.scss'],
})
export class AddressConfirmationComponent implements OnInit {

  constructor(private router: Router, private appComponenet: AppComponent) { }

  addressArray: any;

  ngOnInit() {
    this.addressArray = JSON.parse(localStorage.getItem("shiping_address"));
    console.log(localStorage.getItem("shiping_address"));
  }

  onYes() {
    this.router.navigate(['/item-select'])
    console.log("Yes clicked")
  }

  onNo() {
    this.router.navigate(['/message']);
    localStorage.setItem("message", "Please contact your centre");
    this.appComponenet.cancel_location = "address-confirmation: No clicked";
  }

}
