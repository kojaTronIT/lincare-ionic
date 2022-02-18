import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
})
export class ItemSelectComponent {

  constructor(private router: Router) {}
  
  selectedRadioGroup: any;

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'cylinders',
      text: 'Oxygen cylinders',
      disabled: false,
      color: 'secondary'
    }, 
    {
      id: '2',
      name: 'radio_list',
      value: 'cannuals',
      text: 'Cannuals',
      disabled: false,
      color: 'secondary'
    }, 
    {
      id: '3',
      name: 'radio_list',
      value: 'tubing',
      text: 'Tubing',
      disabled: false,
      color: 'secondary'
    }
  ];

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }

  radioBlur() {
    console.log("radioBlur");
  }

  onSubmit() {
    if (this.selectedRadioGroup === undefined) {
      alert("No products selected" + "\nPlease select at least one item")
    } else {
      switch (this.selectedRadioGroup.value) {
        case "cylinders":
          this.router.navigate(['/amount-picker']);
          break;

        case "cannuals":
          console.log("cannuals");
          break;

        case "tubing":
          console.log("tubing");
          break;

        case undefined:
          alert("No products selected" + "\nPlease select at least one item")
          break;  
      }
    }
    
  }

  onCancel() {
    this.router.navigate(['/home'])
  }

}
