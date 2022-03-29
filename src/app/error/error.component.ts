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

        if (data.message == "You have canceled your request") {
          this.flag = true;
        } else {
          this.flag = false;
        }
      },
      error: (error) => console.log(error.error)
    });

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })
  }

}
