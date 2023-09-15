import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { IngredientPopupComponent } from 'src/app/components/popups/ingredient-popup/ingredient-popup.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { CategoryInterface } from 'src/app/modals/category.model';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';
import { SubCategoryIntarface } from 'src/app/modals/sub_category.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

interface Food {
  value: string;
  viewValue: string;
}
interface ROWDATA {
  nutrition_name: string;
  nutrition_per_100_gram: Array<string>;
  nutrition_in_this_pack: Array<string>;
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
  selectedCategory: string | undefined;
  selectedAttribute: any | undefined;
  selectedValue: string | undefined;
  imageError: string | undefined;
  image = '../../../assets/icons/imageAdd.png';
  textareaContent = '';
  checked: boolean | undefined;
  checked1: boolean | undefined;
  selectedValuesArray: Array<any> = [];
  catId: any;
  ingredient_data: IngredientIntarface[] = [];
  attribute_data: AttributeIntarface[] = [];
  categories: CategoryInterface[] = [];
  subcategories: any[] = [];
  product_data: any;
  inputcol_1: any[] = [[]];
  inputcol_2: any[] = [[]];
  selectedSubCategory: any[] = [];
  selectedIngredient: any[] = [];
  user_status: any;
  chage_priview_status: any;
  product: any = [];

  product_image: any;
  product_image_details: any;
  varient_image_details: any[] = [];
  varient_image: any;
  imageLoop:any
  imageIndex:any

  table_row: Array<any> = [{ nutrition_name: '', nutrition_per_100_gram: [''], nutrition_in_this_pack: [''] }];

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
  test(data: any) {}

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.userForm = this.fb.group({
      name: [],
      rows: this.fb.array([this.fb.control(null)]),
      col2_2s: this.fb.array([this.fb.control(null)]),
      col2_3s: this.fb.array([this.fb.control(null)]),
    });
  }

  ngOnInit(): void {
    this.getCategoryData();

    this.getIngredient();
    this.getAttribute();
  }

  addrow(): void {
    this.table_row.push({ nutrition_name: '', nutrition_per_100_gram: [''], nutrition_in_this_pack: [''] });
    (this.userForm.get('rows') as FormArray).push(this.fb.control(null));
  }
  getrowFormControls(): AbstractControl[] {
    return this.table_row;
  }
  addcell2_2(i: number): void {
    this.table_row[i].nutrition_per_100_gram.push('');
    (this.userForm.get('col2_2s') as FormArray).push(this.fb.control(null));
    this.inputcol_1.push('');
  }
  getcell2_2FormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('col2_2s')).controls;
  }
  addcell2_3(i: number): void {
    this.table_row[i].nutrition_in_this_pack.push('');
    (this.userForm.get('col2_3s') as FormArray).push(this.fb.control(null));
    this.inputcol_2.push('');
  }
  getcell2_3FormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('col2_3s')).controls;
  }

  onSelectionChange(): void {
    if (
      this.selectedAttribute &&
      !this.selectedValuesArray.includes(this.selectedAttribute)
    ) {
      this.selectedValuesArray.push(this.selectedAttribute);


    }
  }

  removeinput2_2(index: number, id: any) {
    if (this.table_row[index].nutrition_per_100_gram.length > 1) {
      this.table_row[index].nutrition_per_100_gram.splice(id, 1);
    }
  }
  removeinput2_3(index: number, id: any) {
    if (this.table_row[index].nutrition_in_this_pack.length > 1) {
      this.table_row[index].nutrition_in_this_pack.splice(id, 1);
    }
  }
  deleteRow(index: number) {
    if (this.table_row.length > 1) {
      this.table_row.splice(index, 1);
    }
  }

  closebtn(id: any) {
    alert(id);

    this.selectedValuesArray = this.selectedValuesArray.filter(
      (item) => item.attribute_id !== id
    );
  }

  getCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'category')
      .then((response: any) => {
        this.categories = response.result.data;
      });
  }

  get_category_id(id: any) {
    this.catId = id;

    this.getSubCategoryData();
  }

  getSubCategoryData() {
    this.apiService
      .get(
        String(this.tokestorage.getToken()),
        'category-has-sub-category/category/' + this.catId
      )
      .then((response: any) => {
        this.subcategories = response.result;
      });
  }

  public getIngredient() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'ingredient/view')
      .then((response: any) => {
        this.ingredient_data = response.result;
      });
  }

  AddIngrident() {
    let dialogRef = this.dialog.open(IngredientPopupComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        // You can check the result if needed.
        this.done();
        this.getIngredient();
      }
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

  AddAttribute() {
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        // You can check the result if needed.
        this.done();
        this.getAttribute();
      }
    });
  }

  public getAttribute() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'attributes/all')
      .then((response: any) => {
        this.attribute_data = response.result;
      });
  }

  Product_image_data(data: any) {
    this.product_image_details = data.fileName;
  
  }
  varient_image_data(data: Array<any>) {
    console.log("dddd",typeof  data);
    console.log( data);
    data=data[0]
   
    for (var i = 0; i < data.length; i++) {
      this.varient_image_details.push(data[i].filename);
      console.log(data[i].filename);
      
    }

    
    
  }
  chageStatus(data: any) {
    if (data == true) {
      this.user_status = 1;
    } else {
      this.user_status = 2;
    }

  }
  chagePriviewStatus(data: any) {
    if (data == true) {
      this.chage_priview_status = 1;
    } else {
      this.chage_priview_status = 2;
    }

  }

  product_nameformcontrol = new FormControl('', [Validators.required]);
  description_formcontrol = new FormControl('', [Validators.required]);
  varient_formcontrol = new FormControl('', [Validators.required]);
  varientDescription_formcontrol = new FormControl('', [Validators.required]);
  priceformcontrol = new FormControl('', [Validators.required]);
  varientAttribute_formcontrol = new FormControl('', [Validators.required]);


  save() {

    for (let index = 0; index < this.varient_image_details.length; index++) {
      const element = this.varient_image_details[index];
      console.log('RCs', index);
      this.imageLoop = this.varient_image_details[index]
      this.imageIndex = index
    }
    

    const data = {
      product: {
        // product_id: string,
        category_has_sub_category_id: this.selectedSubCategory ,
        product_name: this.product_nameformcontrol.value,
        product_main_image: this.product_image_details,
        product_description: this.description_formcontrol.value,
        product_ingredients: this.selectedIngredient,
        product_in_stock: this.user_status,
        // product_featured: 1,
        product_rating: 5,
        product_status: this.chage_priview_status
      },
      product_variant: [
        {
          // product_variant_id: string,
          product_variant_name: this.varient_formcontrol.value,
          product_images: [
            {
              product_image: this.imageLoop,
              product_image_order: this.imageIndex
            }
          ],
          product_price: this.priceformcontrol.value,
          product_attribute_list: [
            {
              attribute_id: this.selectedAttribute?.attribute_id,
              attribute_value: this.selectedAttribute?.attribute_name
            }
          ],
          product_variant_nutrition_list: this.table_row
        }
      ]
    };

    // };
    this.apiService

      .post(data, String(this.tokestorage.getToken()), 'products/create')
      .then((response: any) => {
        this.product_data = response.result[0];

        // this.closebutton.nativeElement.click();
        this.done();
      })
      .catch((error: any) => {
        // this.toste.error(error.error.detail.message);
      });
  }

  dataadd(row: number, i: number, col: number, event: any) {
 

   
    

    var data = event.target.value;

    
   if (i == 2) {
      this.table_row[row].nutrition_per_100_gram[col] = data;
    } else {
      this.table_row[row].nutrition_in_this_pack[col] = data;
    }
  }
}
