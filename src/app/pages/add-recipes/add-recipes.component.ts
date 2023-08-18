import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl } from '@angular/forms';



@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.scss']
})
export class AddRecipesComponent {

  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;

  checked: boolean | undefined;
  textareaContent = '';

  attribute_array_Ind:Array<string>=[''];
  attribute_array_step:Array<string>=[''];
  index: number | undefined; 
  userForm1: FormGroup;
  userForm2: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.userForm1 = this.fb.group({
      name: [],
      Ingredients: this.fb.array([
        this.fb.control(null)
      ])
    })
    this.userForm2 = this.fb.group({
      name: [],
      Step: this.fb.array([
        this.fb.control(null)
      ])
    })
  }

  addIngredients(): void {
    (this.userForm1.get('Ingredients') as FormArray).push(
      this.fb.control(null)
    );
    this.attribute_array_Ind.push("")
    console.log(this.getIngredientsFormControls())
  }
  getIngredientsFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm1.get('Ingredients')).controls
  }


  addStep(): void {
    (this.userForm2.get('Step') as FormArray).push(
      this.fb.control(null)
    );
    this.attribute_array_step.push("")
    console.log(this.getStepFormControls())
  }
  getStepFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm2.get('Step')).controls
  }


  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

}


