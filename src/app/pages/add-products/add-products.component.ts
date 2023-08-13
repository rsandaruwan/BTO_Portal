import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';


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

  name = 'Angular 4';
  url: string | ArrayBuffer | null = null;


  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  base64String: any;
  fontSize: any;



 
  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  test(data: any) {
    alert(data);
  }

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [],
      rows: this.fb.array([
        this.fb.control(null)
      ]),
      col2_2s: this.fb.array([
        this.fb.control(null)
      ]),
      col2_3s: this.fb.array([
        this.fb.control(null)
      ])
    })
  }

  addrow(): void {
    (this.userForm.get('rows') as FormArray).push(
      this.fb.control(null)
    );
  }
  getrowFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('rows')).controls
  }
  addcell2_2(): void {
    (this.userForm.get('col2_2s') as FormArray).push(
      this.fb.control(null)
    );
  }
  getcell2_2FormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('col2_2s')).controls
  }
  addcell2_3(): void {
    (this.userForm.get('col2_3s') as FormArray).push(
      this.fb.control(null)
    );
  }
  getcell2_3FormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('col2_3s')).controls
  }
}
