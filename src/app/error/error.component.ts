import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  message;

  constructor(private appComponent: AppComponent, private homeService: HomeServiceService) { }

  ngOnInit() {
    this.message = localStorage.getItem("message");

    this.homeService.validateCancel(localStorage.getItem("one_time_code"), this.appComponent.cancel_location).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error.error)
      })

    console.log(this.appComponent.cancel_location);
  }

}
