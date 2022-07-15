import { Component, HostListener } from '@angular/core';
import { HomeServiceService } from './home/home-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  @HostListener('window: unload', ['$event'])
  unloadHandler(event) {
    localStorage.setItem("isValid", "false")
  }

  constructor(private homeService: HomeServiceService) {}

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

  isOneTimeLinkValid(valid: boolean) {
    if(valid === true) {
      localStorage.setItem("isValid", "true");
    } else {
      localStorage.setItem("isValid", "false");
    }
  }

  setUserActions(action: string, actionLocation: string) {
    localStorage.setItem("action", action);
    localStorage.setItem("actionLocation", actionLocation);
  }

  logActions(action: string, actionLocation: string) {
    this.homeService.logUserActions(
      action, actionLocation, localStorage.getItem("one_time_code")
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error.error)
    })
  }

}
