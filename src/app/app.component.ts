import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor() {}

  public item_select_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'cylinders',
      checked: false,
      text: 'Oxygen cylinders'
    },
    {
      id: '2',
      name: 'radio_list',
      value: 'cannuals',
      checked: false,
      text: 'Cannuals'
    },
    {
      id: '3',
      name: 'radio_list',
      value: 'tubing',
      checked: false,
      text: 'Tubing'
    }
  ];

  indexTracker(index: number) {
    return index;
  }

}
