import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-eof-blocker',
  templateUrl: './eof-blocker.component.html',
  styleUrls: ['./eof-blocker.component.scss'],
})
export class EofBlockerComponent implements OnInit {

  message;

  constructor(private homeService: HomeServiceService, private location: LocationStrategy) {

    history.pushState(null, null, window.location.href);

    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    
  }

  ngOnInit() {
    this.homeService.displayMessageForAction(localStorage.getItem("messageKey")).subscribe({
      next: (data) => this.message = data.message,
      error: (error) => console.log(error.error)
    });
  }

}
