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
interface ROWDATA {
  column1: string;
  column2: Array<string>;
  column3: Array<string>;
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

  inputcol_1: any[] = [[]];
  inputcol_2: any[] = [[]];

  table_row: Array<any> = [{ column1: '', column2: [''], column3: [''] }];

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
    this.table_row.push({ column1: '', column2: [''], column3: [''] });
    (this.userForm.get('rows') as FormArray).push(this.fb.control(null));
  }
  getrowFormControls(): AbstractControl[] {
    return this.table_row;
  }
  addcell2_2(i: number): void {
    this.table_row[i].column2.push('');
    (this.userForm.get('col2_2s') as FormArray).push(this.fb.control(null));
    this.inputcol_1.push('');
  }
  getcell2_2FormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('col2_2s')).controls;
  }
  addcell2_3(i: number): void {
    this.table_row[i].column3.push('');
    (this.userForm.get('col2_3s') as FormArray).push(this.fb.control(null));
    this.inputcol_2.push('');
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


    }
  }

  removeinput2_2(index: number, id: any) {
  
    if (this.table_row[index].column2.length>1) {
      this.table_row[index].column2.splice(id, 1);
    }
  }
  removeinput2_3(index: number, id: any) {
    if (this.table_row[index].column3.length>1) {
      this.table_row[index].column3.splice(id, 1);
    }
  }
  deleteRow(index: number) {
    if(this.table_row.length > 1) {
    this.table_row.splice(index, 1);
    }
  }

  closebtn(id: any) {
    let array_selected_value = this.selectedValuesArray[id];
    let array_selected_id = id;

   
    if (
      array_selected_id >= 0 &&
      array_selected_id < this.selectedValuesArray.length
    ) {
      this.selectedValuesArray.splice(array_selected_id, 2);
    }
  }
}
