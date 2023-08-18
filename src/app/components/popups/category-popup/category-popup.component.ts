import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss']
})
export class CategoryPopupComponent {

  selectedValue: string | undefined;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(public dialog: MatDialog) {}

  done(){
 

    var data1 = {
      msg: 'Ingredient added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
     
}
}
