import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

export interface User {
  ingredient_name: string;
  ingredient_id: string;
}

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.scss'],
})
export class AddRecipesComponent implements OnInit {
  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;

  checked: boolean | undefined;
  textareaContent = '';
  ingerdient_array: Array<string> = [''];
  step_array: Array<string> = [''];
  tags_array: Array<string> = [''];

  index: number | undefined;
  userForm1: FormGroup;
  userForm2: FormGroup;
  userForm3: FormGroup;
  ingredients: any;
  values: any = '';
  resipe_data: any;
  resultArray: { type: string; msg: string }[] = [];

  // recipes_ingredient = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]> | undefined;
  selectedIngredent: Array<any> = [{  recipe_ingredient_used: "", recipe_ingredient_product_variants: ""}];

  recipes_name = new FormControl('', [Validators.required]);
  recipes_description = new FormControl('', [Validators.required]);
  recipes_ingredient = new FormControl('', [Validators.required]);
  recipes_step = new FormControl('', [Validators.required]);
  recipes_tags = new FormControl('', [Validators.required]);
  fc_array: Array<FormControl>=[new FormControl('', [Validators.required])];
  fo_array: Array<Observable<User[]>>=[];

  ngOnInit() {
    this.getIngredientsData();
    this.fo_array[0] = this.fc_array[0].valueChanges.pipe(
      startWith(''),
      // map(value => (typeof value === "string" ? value : value.ingredient_name)),
      map((ingredient_name) =>
        ingredient_name ? this._filter(ingredient_name) : this.options.slice()
      )
    );
  }

  displayFn(user?: User): string {
    console.log(user ? user.ingredient_id : '');
    return user ? user.ingredient_name : '';
  }
  returnFn(user?: User): string {
    return user ? user.ingredient_id : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) =>
        option.ingredient_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onKey(event: any) {
    // without type info
    this.values = event.target.value;

    console.log(' value', this.values);
    this.getIngredientsData();
  }

  constructor(
    private fb: FormBuilder,
    private tokestorage: StorageService,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.userForm1 = this.fb.group({
      name: [],
      Ingredients: this.fb.array([this.fb.control(null)]),
    });
    this.userForm2 = this.fb.group({
      name: [],
      Step: this.fb.array([this.fb.control(null)]),
    });
    this.userForm3 = this.fb.group({
      name: [],
      Step: this.fb.array([this.fb.control(null)]),
    });
  }

  addIngredients(): void {
    this.fc_array.push(new FormControl('', [Validators.required]));
    this.fo_array.push(this.fc_array[(this.fc_array.length-1)].valueChanges.pipe(
      startWith(''),
      // map(value => (typeof value === "string" ? value : value.ingredient_name)),
      map((ingredient_name) =>
        ingredient_name ? this._filter(ingredient_name) : this.options.slice()
      )
    ))
    this.selectedIngredent.push({  recipe_ingredient_used: "", recipe_ingredient_product_variants: ""});
    (this.userForm1.get('Ingredients') as FormArray).push(this.fb.control(null));
    this.ingerdient_array.push('');
  }
  getIngredientsFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm1.get('Ingredients')).controls;
  }

  addStep(): void {
    (this.userForm2.get('Step') as FormArray).push(this.fb.control(null));
    this.step_array.push('');
  }
  getStepFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm2.get('Step')).controls;
  }
  addTags(): void {
    (this.userForm3.get('Step') as FormArray).push(this.fb.control(null));
    this.tags_array.push('');
  }
  getTagsFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm3.get('Step')).controls;
  }

  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  getIngredientsData() {
    if (this.values) {
      this.apiService
        .get(
          String(this.tokestorage.getToken()),
          'ingredient/search?ingredient_name=' + this.values
        )
        .then((response: any) => {
          this.ingredients = response.result;
          this.options = this.ingredients;

          console.log(this.ingredients);
        });
    }
  }

  save() {
    alert();

    var Ind_data :any = this.fc_array[1].value;
    if (Ind_data) console.log('data resuult', Ind_data);
    


    const data = {
      recipe_name: this.recipes_name.value,
      recipe_category_id: new Array<any>(),
      recipe_summary: this.recipes_description.value,
      // recipe_main_image: ,
      // recipe_step: [
      //   {
      //     recipe_step_name: ,
      //     recipe_step_description: ,
      //     recipe_step_images: [

      //     ]
      //   }
      // ],
      recipe_ingredient: new Array<any>(),
    };


    if (Ind_data.ingredient_id) {
      for (const ingredient of this.selectedIngredent) {
        this.selectedIngredent.push({
          recipe_ingredient_used: Ind_data,
          recipe_ingredient_product_variants:Ind_data.ingredient_id,
        });
      }
    }else{
      for (const ingredient of this.selectedIngredent) {
        this.selectedIngredent.push({
          recipe_ingredient_used: Ind_data,
          recipe_ingredient_product_variants: null,
        });
      }
    }

    this.apiService

      .post(data, String(this.tokestorage.getToken()), 'category/create')
      .then((response: any) => {
        this.resipe_data = response.result[0];

        this.done();
      })
      .catch((error: any) => {
        error.error.detail.forEach((item: any) => {
          if (item.loc && item.loc[1] && item.msg) {
            this.resultArray.push({
              type: item.loc[1],
              msg: item.msg,
            });
            console.log(this.resultArray);
          }
        });
      });
  }

  done() {
    var data1 = {
      msg: 'Category added to the system Successfully!',
    };

    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
  updated() {
    var data1 = {
      msg: 'Category updated to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
}
