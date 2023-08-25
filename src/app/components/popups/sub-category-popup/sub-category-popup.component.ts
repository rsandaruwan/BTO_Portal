import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
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
  selectedCategory: Array<any> =[{category:'',attributes:[]}];
  userForm: FormGroup;
  selectedValuesArray: string[] = [];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  ngOnInit(): void {
   
  }

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    });
  }

  sub_category_nameformcontrol = new FormControl('', [
    Validators.required
   
  ]);

  addPhone(): void {
    this.selectedCategory.push([{category:'',attributes:[]}]);
    (this.userForm.get('phones') as FormArray).push(this.fb.control(null));
  }

  removecategory(index: any) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('phones')).controls;
  }

  onSelectionChange(): void {
  
  }

  closebtn(id: any) {
    if (this.selectedCategory) {
      this.selectedCategory.splice(id, 1);
    }
  }
  save(){

  }
}
