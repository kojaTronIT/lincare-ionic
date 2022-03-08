import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-dummy-page',
  templateUrl: './dummy-page.component.html',
  styleUrls: ['./dummy-page.component.scss'],
})
export class DummyPageComponent implements OnInit {

  zipcode_list: any[][];

  constructor(private homeService: HomeServiceService, private router: Router) { }

  ngOnInit() {
    this.homeService.getZipcodes().subscribe({
      next: (data) => {this.zipcode_list = data, console.log(data)},
      error: (error) => console.log(error.message)
    })
  }

  onSubmit() {
    this.router.navigate(['/home']);
  }

}
