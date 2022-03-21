import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  message;

  constructor(private homeService: HomeServiceService) { }

  ngOnInit() {
    this.message = localStorage.getItem("message");

    this.homeService.logUserActions(
      localStorage.getItem("one_time_code"), localStorage.getItem("action"), localStorage.getItem("actionLocation")
      ).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error.error)
      })

  }

}
