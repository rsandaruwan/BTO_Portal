import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { IngredientPopupComponent } from 'src/app/components/popups/ingredient-popup/ingredient-popup.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { CategoryInterface } from 'src/app/modals/category.model';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';
import { AddProductResultData } from 'src/app/modals/product_data';
import { SubCategoryIntarface } from 'src/app/modals/sub_category.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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

//   public result_data={
//     "status": 1,
//     "message": "Product",
//     "result": {
//         "product": {
//             "product_id": "63e61b62c433d152ad0750fc",
//             "category_has_sub_category_id": [
//                 "63e4e8b9850cd70826747f65"
//             ],
//             "product_name": "Pure Ceylon Cinnamon Powder",
//             "product_description": "Ceylon Cinnamon (Cinnamomum zeylanicum), extracted from the bark of a plant indigenous to Sri Lanka, is pleasantly aromatic, presenting lighter and brighter citreous tones. Pure Ceylon Cinnamon is an ingredient much sought after for use in kitchens worldwide as an aromatic condiment in a wide variety of dishes, breakfast cereals, snack-foods, beverages and desserts. Ceylon Cinnamon considered the finest Cinnamon in the world is recommended for daily use.",
//             "product_main_image": "public/images/products/7167560BCB1F466C8B77.png",
//             "ingredient": [
//                 "63e4e869ce2dc7dc87ee8cf4"
//             ],
//             "product_status": 1,
//             "product_in_stock": 1,
//             "product_featured": 1,
//             "product_rating": 5,
//             "created_at": "2023-02-10 15:54:34.658000",
//             "created_by": "639abd8ef76d3aebb98dfe40"
//         },
//         "product_variant": [
//             {
//                 "product_variant_id": "63e61b62c433d152ad0750fd",
//                 "product_id": "63e61b62c433d152ad0750fc",
//                 "product_variant_name": "Pure Ceylon Cinnamon Powde - Regular Range",
//                 "product_variant_seo_title": "pure-ceylon-cinnamon-powde-regular-range",
//                 "product_images": [
//                     {
//                         "image_path": "public/images/products/27C890F95CD14F199DAD.png",
//                         "image_order": 1
//                     },
//                     {
//                         "image_path": "public/images/products/7446AE3FDEE346929B08.png",
//                         "image_order": 2
//                     }
//                 ],
//                 "product_attributes": [
//                     {
//                         "attribute_id": "63e61972c433d152ad0750fb",
//                         "attribute_value": "82g"
//                     },
//                     {
//                         "attribute_id": "63e4e7aece2dc7dc87ee8cf2",
//                         "attribute_value": "Pouch"
//                     },
//                     {
//                         "attribute_id": "63e4e7a6ce2dc7dc87ee8cf1",
//                         "attribute_value": "Powder/ Dry"
//                     }
//                 ],
//                 "product_nutrition": [
//                     {
//                         "nutrition_name": "Energy",
//                         "nutrition_per_100_gram": [
//                             "246.43kJ",
//                             "58.90kcal"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "24.64kJ",
//                             "5.89kcal"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Fat",
//                         "nutrition_per_100_gram": [
//                             "0.90g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.09g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Of which saturates",
//                         "nutrition_per_100_gram": [
//                             "0.48g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.048g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Carbohydrates",
//                         "nutrition_per_100_gram": [
//                             "84.10g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "8.41g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Of which sugars",
//                         "nutrition_per_100_gram": [
//                             "0.0g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.0g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Dietary Fiber",
//                         "nutrition_per_100_gram": [
//                             "74.50g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "7.45g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Protein",
//                         "nutrition_per_100_gram": [
//                             "3.10g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.31g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Sodium",
//                         "nutrition_per_100_gram": [
//                             "0.003g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.000g"
//                         ]
//                     }
//                 ],
//                 "product_price": 5.0
//             },
//             {
//                 "product_variant_id": "63e61b63c433d152ad0750fe",
//                 "product_id": "63e61b62c433d152ad0750fc",
//                 "product_variant_name": "Pure Ceylon Cinnamon Powde - Epic Bottle",
//                 "product_variant_seo_title": "pure-ceylon-cinnamon-powde-epic-bottle",
//                 "product_images": [
//                     {
//                         "image_path": "public/images/products/7055E18284F447F2A25B.png",
//                         "image_order": 1
//                     },
//                     {
//                         "image_path": "public/images/products/2D79C6E198EA41A7BBA7.png",
//                         "image_order": 2
//                     }
//                 ],
//                 "product_attributes": [
//                     {
//                         "attribute_id": "63e61972c433d152ad0750fb",
//                         "attribute_value": "83g"
//                     },
//                     {
//                         "attribute_id": "63e4e7aece2dc7dc87ee8cf2",
//                         "attribute_value": "Bottle"
//                     },
//                     {
//                         "attribute_id": "63e4e7a6ce2dc7dc87ee8cf1",
//                         "attribute_value": "Powder/ Dry"
//                     }
//                 ],
//                 "product_nutrition": [
//                     {
//                         "nutrition_name": "Energy",
//                         "nutrition_per_100_gram": [
//                             "246.43kJ",
//                             "58.90kcal"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "24.64kJ",
//                             "5.89kcal"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Fat",
//                         "nutrition_per_100_gram": [
//                             "0.90g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.09g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Of which saturates",
//                         "nutrition_per_100_gram": [
//                             "0.48g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.048g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Carbohydrates",
//                         "nutrition_per_100_gram": [
//                             "84.10g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "8.41g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Of which sugars",
//                         "nutrition_per_100_gram": [
//                             "0.0g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.0g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Dietary Fiber",
//                         "nutrition_per_100_gram": [
//                             "74.50g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "7.45g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Protein",
//                         "nutrition_per_100_gram": [
//                             "3.10g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.31g"
//                         ]
//                     },
//                     {
//                         "nutrition_name": "Sodium",
//                         "nutrition_per_100_gram": [
//                             "0.003g"
//                         ],
//                         "nutrition_in_this_pack": [
//                             "0.000g"
//                         ]
//                     }
//                 ],
//                 "product_price": 5.5
//             }
//         ]
//     }
// }



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
  selectedValuesNameArray: Array<any> = [];
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
  product_status: any;
  chage_priview_status: any;
  product: any = [];
  varient_error: any = [];
  nutrition_error: any = [];
  errors: any = [];
  product_image: any;
  product_image_details: any;
  varient_image_details: any[] = [];
  varient_image: any;
  imageLoop: any;
  imageIndex: any;
  attribute_id: any;
  attribute_input_name: any;
  attribute_data_list: any[] = [];
  variant_data: any;
  variant_array: any[] = [];
  show = 1;
  changingValue: Subject<boolean> = new Subject();
  variant_submit_data: any[] = [];
  productData: any;
  product_status_value: any;
  pro_status: any;
  prv_status: any;
  get_varient_data : Array<string> = [];

  table_row: Array<any> = [
    {
      nutrition_name: '',
      nutrition_per_100_gram: [''],
      nutrition_in_this_pack: [''],
    },
  ];

  proId: string | undefined;

  name = 'Angular 4';
  url: string | ArrayBuffer | null = null;

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
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.proId = params['id'];
    });


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
//edit

this.getProductData();
    if (this.proId) {
      
      this.getProductData();

    } else{
      this.variant_array.push({});
    }
  }

  addNewItem(value: string) {}
  dataToPayLoad(data: any) {
    this.variant_submit_data.push(data);
  }
  addrow(): void {
    this.table_row.push({
      nutrition_name: '',
      nutrition_per_100_gram: [''],
      nutrition_in_this_pack: [''],
    });
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
      !this.selectedValuesArray.find(
        (element) => element.id === this.selectedAttribute.attribute_id
      )
    ) {
      var data = {
        attribute_id: this.selectedAttribute.attribute_id,
        attribute_value: '',
      };
      this.selectedValuesArray.push(data);
      this.selectedValuesNameArray.push(this.selectedAttribute);
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


  // change view to All
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
    data = data[0];

    for (var i = 0; i < data.length; i++) {
      this.varient_image_details.push(data[i].filename);
    }
  }
  chageStatus(data: any) {
    if (data == true) {
      this.product_status = 1;
    } else {
      this.product_status = 2;
    }
  }
  chagePriviewStatus(data: any) {
    if (data == true) {
      this.chage_priview_status = 1;
    } else {
      this.chage_priview_status = 2;
    }
  }
  AddVarient() {
    this.show = this.show + 1;
    if (this.show % 2 == 0 || this.show % 2 == 1) {
      this.variant_array.push({});
    }
  }

  getProductData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'products/' + this.proId)
      .then((response: any) => {
        this.productData = response.result;
        //  this.productData = this.result_data.result;


        this.selectedSubCategory = this.productData.product;
        this.product_nameformcontrol.setValue(
          this.productData.product.product_name
        );
        this.product_image = this.productData.product.product_main_image;
        this.description_formcontrol.setValue(
          this.productData.product.product_description
        );
        this.selectedIngredient = this.productData.product.ingredient;
        this.product_status = this.productData.product.product_status;
        this.chage_priview_status = this.productData.product.product_in_stock;

        this.get_varient_data = this.productData.product_variant

        this.changeProductStatus();
        this.changePreviewStatus();

        this.variant_array=this.productData.product_variant;
      });
  }

  changeProductStatus() {
    if (this.product_status == 1) {
      this.pro_status = true;
    }
    else {
      this.pro_status = false;
    }
  }

  changePreviewStatus() {
    if (this.chage_priview_status == 1) {
      this.prv_status = true;
    }
    else {
      this.prv_status = false;
    }
  }

  product_nameformcontrol = new FormControl('', [Validators.required]);
  description_formcontrol = new FormControl('', [Validators.required]);
  varient_formcontrol = new FormControl('', [Validators.required]);
  varientDescription_formcontrol = new FormControl('', [Validators.required]);
  priceformcontrol = new FormControl('', [Validators.required]);

  save() {
    this.changingValue.next(true);
    for (let index = 0; index < this.varient_image_details.length; index++) {
      const element = this.varient_image_details[index];
      this.imageLoop = this.varient_image_details[index];
      this.imageIndex = index;
    }

    const data = {
      product: {
        category_has_sub_category_id: this.selectedSubCategory,
        product_name: this.product_nameformcontrol.value,
        product_main_image: this.product_image_details,
        product_description: this.description_formcontrol.value,
        product_ingredients: this.selectedIngredient,
        product_in_stock: this.product_status,

        product_rating: 5,
        product_status: this.chage_priview_status,
      },
      product_variant: this.variant_submit_data,
    };

    // };

    this.apiService

      .post(data, String(this.tokestorage.getToken()), 'products/create')
      .then((response: any) => {
        this.product_data = response.result[0];

        this.done();
      })
      .catch((error: any) => {
        this.errors = [];
        this.varient_error = [];
        this.nutrition_error = [];

        error.error.detail.map((errorData: any) => {
          this.errors[errorData.loc[1]] = errorData.msg;
        });
        error.error.detail.map((errorData: any) => {
          this.varient_error[errorData.loc[3]] = errorData.msg;
        });
        error.error.detail.map((errorData: any) => {
          this.nutrition_error[errorData.loc[5]] = errorData.msg;
        });
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

  geAllSubCategoryData() {
    this.apiService
      .get(
        String(this.tokestorage.getToken()),
        'category-has-sub-category/view'
      )
      .then((response: any) => {
        this.subcategories = response.result;
      });
  }
}
