import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  message;

  flag = false;

  constructor(private homeService: HomeServiceService) { }

  ngOnInit() {
    this.homeService.displayMessageForAction(localStorage.getItem("messageKey")).subscribe({
      next: (data) => { 
        this.message = data.message 

        if (data.message === "You have canceled your request") {
          this.flag = true;
        } else {
          this.flag = false;
        }
      },
      error: (error) => this.message = "We were not able to process your request. Please contact your local center (PH Placeholder)"
    });

    this.homeService.logUserActions(
      localStorage.getItem("action"), localStorage.getItem("actionLocation"), localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })
  }

}
