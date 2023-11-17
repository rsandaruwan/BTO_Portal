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
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

export interface User {
  product_variant_name: string;
  product_variant_id: string;
}

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.scss'],
})
export class AddRecipesComponent implements OnInit {
  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;
  test: any[] = [];
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
  ingredients_array: { ingredient_id: string; ingredient_name: string }[] = [];
  Ind_data: any;
  options: User[] = [];
  filteredOptions: Observable<User[]> | undefined;
  selectedIngredent: Array<any> = [
    { recipe_ingredient_used: '', recipe_ingredient_product_variants: '' },
  ];
  selectedsteps: Array<any> = [
    {
      recipe_step_name: '',
      recipe_step_description: ' This is recipe description',
      recipe_step_images: ['F803F699D5134C5D9754.jpg'],
    },
  ];
  image_details: any;
  recipe_image: any;
  new_ingredient: any[] = [];
  category_data: any[] = [];
  categories: any;
  category_names: any;
  attNameArray: any[] = [];
  chage_priview_status: any;
  category_Id: any[] = [];
  rep_id: any;
  recipe_data:any;
  get_recipe_image:any

  ngOnInit() {
    this.getIngredientsData();
    this.getCategoryData();
    this.fo_array[0] = this.fc_array[0].valueChanges.pipe(
      startWith(''),
      // map(value => (typeof value === "string" ? value : value.ingredient_name)),
      map((ingredient_name) =>
        ingredient_name ? this._filter(ingredient_name) : this.options.slice()
      )
    );
  }

  recipes_name = new FormControl('', [Validators.required]);
  recipes_description = new FormControl('', [Validators.required]);
  recipe_main_image = new FormControl('', [Validators.required]);
  recipes_ingredient = new FormControl('', [Validators.required]);
  recipes_step: Array<FormControl> = [ new FormControl('', [Validators.required]),];
  recipes_tags = new FormControl('', [Validators.required]);
  fc_array: Array<FormControl> = [new FormControl('', [Validators.required])];
  fo_array: Array<Observable<User[]>> = [];

  displayFn(user?: User): string {
    return user ? user.product_variant_name : '';
  }
  returnFn(user?: User): string {
    return user ? user.product_variant_id : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) =>
        option.product_variant_name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onKey(event: any) {
    // without type info
    this.values = event.target.value;

    this.getIngredientsData();
  }

  constructor(
    private fb: FormBuilder,
    private tokestorage: StorageService,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.rep_id = params['id'];
      this.getRecipeDataById();

      console.log(this.rep_id);
    });
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
    this.fo_array.push(
      this.fc_array[this.fc_array.length - 1].valueChanges.pipe(
        startWith(''),
        // map(value => (typeof value === "string" ? value : value.ingredient_name)),
        map((ingredient_name) =>
          ingredient_name ? this._filter(ingredient_name) : this.options.slice()
        )
      )
    );
    this.selectedIngredent.push({
      recipe_ingredient_used: '',
      recipe_ingredient_product_variants: '',
    });
    (this.userForm1.get('Ingredients') as FormArray).push(
      this.fb.control(null)
    );
    this.ingerdient_array.push('');
  }
  getIngredientsFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm1.get('Ingredients')).controls;
  }

  addStep(): void {
    (this.userForm2.get('Step') as FormArray).push(this.fb.control(null));
    this.step_array.push('');
    this.recipes_step.push(new FormControl('', [Validators.required]));

    this.selectedsteps.push({
      recipe_step_name: '',
      recipe_step_description: ' This is demo description',
      recipe_step_images: [],
    });
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
          'product-variants/search_by_name?name=' + this.values
        )
        .then((response: any) => {
          this.ingredients = response;

          console.log(this.ingredients);

          this.options = this.ingredients;
        });
    }
  }

  image_data(data: any) {
    this.image_details = data.fileName;
  }

  selectOption(option: any, index: number) {
    this.test[index] = option;
  }

  getCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'recipe-category/all')
      .then((response: any) => {
        this.categories = response.result;
      });
  }
  closebtn(id: any) {
    this.attNameArray.splice(id, 1);
  }
  onSelectionChange() {
    const uniqueCategoryIds = new Set<string>();

    this.category_data.forEach((category) => {
      uniqueCategoryIds.add(category.recipe_category_id);
    });

    this.category_Id = Array.from(uniqueCategoryIds);

    console.log(this.category_Id);
  }
  chagePriviewStatus(data: any) {
    if (data == true) {
      this.chage_priview_status = 1;
    } else {
      this.chage_priview_status = 0;
    }
  }

  getRecipeDataById() {
    this.apiService
      .get(
        String(this.tokestorage.getToken()),
        'recipe/search?recipe_id=' + this.rep_id
      )
      .then((response: any) => {
        this.recipe_data = response.result;
        console.log("recipe", this.recipe_data);

        this.recipes_name.setValue(  this.recipe_data[0].recipe_name);
        this.recipes_description.setValue(  this.recipe_data[0].recipe_summary );
        this.get_recipe_image = this.recipe_data[0].recipe_main_image
         this.selectedIngredent = [];

        for (let i = 0; i < this.recipe_data[0].recipe_ingredient.length; i++) {
          this.selectedIngredent.push(
            { recipe_ingredient_used:this.recipe_data[0].recipe_ingredient[i].recipe_ingredient_used,
               recipe_ingredient_product_variants: this.recipe_data[0].recipe_ingredient[i].product_variant_id },
          )
          this.fc_array.push(new FormControl('dwkd', [Validators.required]))
          this.fo_array.push(
            this.fc_array[this.fc_array.length - 1].valueChanges.pipe(
              startWith(''),
              // map(value => (typeof value === "string" ? value : value.ingredient_name)),
              map((ingredient_name) =>
                ingredient_name ? this._filter(ingredient_name) : this.options.slice()
              )
            )
          );
        }


        this.selectedsteps = this.recipe_data[0].recipes_step
        // for (let i = 0; i < this.recipes_step.length; i++) {
        //   this.selectedsteps.push(
        //     {
        //       recipe_step_name: this.recipe_data[0].recipes_step[i].recipe_step_name,
        //       recipe_step_description: this.recipe_data[0].recipes_step[i].recipe_step_description,
        //       recipe_step_images:this.recipe_data[0].recipes_step[i].recipe_step_image_name,
        //     },
        //   )
        //   console.log(this.recipe_data[0].recipes_step[i].recipe_step_name);
        //   this.recipes_step.push(new FormControl('dwkd', [Validators.required]))
          
        // }
        this.category_data =this.recipe_data[0].recipe_category_details

       
    
        
      });
  }

  getAttributeData() {
    this.new_ingredient = this.selectedIngredent.map((item) => ({
      recipe_ingredient_used: item,
    }));

    for (let i = 0; i < this.new_ingredient.length; i++) {
      if (typeof this.new_ingredient[i].recipe_ingredient_used == 'string') {
        if (this.test[i]) {
          this.new_ingredient[i] = {
            recipe_ingredient_used:
              this.new_ingredient[i].recipe_ingredient_used,
            recipe_ingredient_product_variants: this.test[i].product_variant_id,
          };
        }
      } else if (
        typeof this.new_ingredient[i].recipe_ingredient_used == 'object'
      ) {
        this.new_ingredient[i] = {
          recipe_ingredient_used:
            this.new_ingredient[i].recipe_ingredient_used.product_variant_name,
          recipe_ingredient_product_variants:
            this.new_ingredient[i].recipe_ingredient_used.product_variant_id,
        };
      }
    }
  }

  getStepData() {}

  save() {
    this.getAttributeData();
    this.getStepData();

    const data = {
      recipe_name: this.recipes_name.value,
      recipe_category_id: this.category_Id,
      recipe_summary: this.recipes_description.value,
      recipe_featured: this.chage_priview_status,

      recipe_main_image: this.image_details,
      recipe_step: this.selectedsteps,
      recipe_ingredient: this.new_ingredient,
    };

    // }

    this.apiService

      .post(data, String(this.tokestorage.getToken()), 'recipe/create')
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
