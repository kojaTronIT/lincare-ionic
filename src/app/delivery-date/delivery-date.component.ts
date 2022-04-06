import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-date',
  templateUrl: './delivery-date.component.html',
  styleUrls: ['./delivery-date.component.scss'],
})
export class DeliveryDateComponent implements OnInit {

  currentDate = new Date;

  formatedDate;

  constructor() { }

  ngOnInit() {
    this.currentDate.setDate(this.currentDate.getDate() + 5);
    let datePipe: DatePipe = new DatePipe('en-US');
    this.formatedDate = datePipe.transform(this.currentDate, 'fullDate');
  }

}
