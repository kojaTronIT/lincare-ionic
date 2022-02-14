import { Component, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  constructor() { }

  dateValue = 'Click to select your date of birth';

  formatDate(value: string) {
    return format(parseISO(value), 'MM/dd/yyyy');
  }

}
