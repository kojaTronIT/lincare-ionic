import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  message;

  flag: boolean;

  constructor(private homeService: HomeServiceService) { }

  ngOnInit() {
    this.checkMessage();

    this.homeService.displayMessageForAction(localStorage.getItem("messageKey")).subscribe({
      next: (data) => {

        if(localStorage.getItem("messageKey") === "CANCEL") {
          this.flag = true;
        } else {
          this.flag = false;
        }

        this.message = data.message;
      },
      error: (error) => console.log(error.error) 
    });

    this.homeService.logUserActions(
      localStorage.getItem("action"), 
      localStorage.getItem("actionLocation"), 
      localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })

  }

  checkMessage() {
    if (this.message === undefined || this.message === null) {
      this.message =
        "We were not able to handle your request." +
        "Please contact your local center (PH Placeholder)";
    }
  }

}
