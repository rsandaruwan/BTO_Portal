import { Component, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent {
  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;

  imageState = 'showImage';
  selectedValue: string | undefined;
  imageError: string | undefined;
  image = '../../../assets/icons/imageAdd.png';
  textareaContent = '';
  checked: boolean | undefined;
  checked1: boolean | undefined;
  selectedValuesArray: string[] = [];

  name = 'Angular 4';
  url: string | ArrayBuffer | null = null;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  test(data: any) {
    alert(data);
  }

  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [],
      rows: this.fb.array([this.fb.control(null)]),
      col2_2s: this.fb.array([this.fb.control(null)]),
      col2_3s: this.fb.array([this.fb.control(null)]),
    });
  }

  addrow(): void {
    (this.userForm.get('rows') as FormArray).push(this.fb.control(null));
  }
  getrowFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('rows')).controls;
  }
  addcell2_2(): void {
    (this.userForm.get('col2_2s') as FormArray).push(this.fb.control(null));
  }
  getcell2_2FormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('col2_2s')).controls;
  }
  addcell2_3(): void {
    (this.userForm.get('col2_3s') as FormArray).push(this.fb.control(null));
  }
  getcell2_3FormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('col2_3s')).controls;
  }

  onSelectionChange(): void {
    if (
      this.selectedValue &&
      !this.selectedValuesArray.includes(this.selectedValue)
    ) {
      this.selectedValuesArray.push(this.selectedValue);

      console.log(this.selectedValuesArray);
    }
  }


  removeinput2_2(index: number) {
    (this.userForm.get('col2_2s') as FormArray).removeAt(index);
  }
  removeinput2_3(index: number) {
    (this.userForm.get('col2_3s') as FormArray).removeAt(index);
  }
  deleteRow(index: number) {
    (this.userForm.get('rows') as FormArray).removeAt(index);
  }


  closebtn(id: any) {
    let array_selected_value = this.selectedValuesArray[id];
    let array_selected_id = id;

    // this.selectedValuesArray = this.selectedValuesArray.splice(array_selected_id, 1);
    if (
      array_selected_id >= 0 &&
      array_selected_id < this.selectedValuesArray.length
    ) {
      this.selectedValuesArray.splice(array_selected_id, 2);
    }
  }
}
