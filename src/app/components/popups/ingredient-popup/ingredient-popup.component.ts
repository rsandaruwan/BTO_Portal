import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-ingredient-popup',
  templateUrl: './ingredient-popup.component.html',
  styleUrls: ['./ingredient-popup.component.scss']
})
export class IngredientPopupComponent {

  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;
  
  attribute_array:Array<string>=[''];
  index: number | undefined; 
  userForm: FormGroup;
  textareaContent = '';
  constructor(
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([
        this.fb.control(null)
      ])
    })
  }

  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(
      this.fb.control(null)
    );
    this.attribute_array.push("")
    console.log(this.getPhonesFormControls())
  }

  removePhone(index: any) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('phones')).controls
  }
  returnArray():Array<string> {
    return (this.attribute_array);
  }
  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

}

