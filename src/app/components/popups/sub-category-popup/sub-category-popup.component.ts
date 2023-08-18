import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sub-category-popup',
  templateUrl: './sub-category-popup.component.html',
  styleUrls: ['./sub-category-popup.component.scss'],
})
export class SubCategoryPopupComponent {
  selectedCategory: Array<any> | undefined;
  userForm: FormGroup;
  selectedValuesArray: string[] = [];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    });
  }

  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(this.fb.control(null));
  }

  removecategory(index: any) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('phones')).controls;
  }

  onSelectionChange(): void {
    console.log(this.selectedCategory);
  }

  closebtn(id: any) {
    if (this.selectedCategory) {
      this.selectedCategory.splice(id, 1);
    }
  }
}
