import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { IngredientPopupComponent } from 'src/app/components/popups/ingredient-popup/ingredient-popup.component';
import { VariantsComponent } from 'src/app/components/variants/variants.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { CategoryInterface } from 'src/app/modals/category.model';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';
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
  autoHeightTextarea!: ElementRef;

  @ViewChild('removeImage', { static: false }) imageUploadComponent:
    | ImageUploadComponent
    | undefined;

  @ViewChild('varientReset', { static: false }) variantsComponent:
    | VariantsComponent
    | undefined;

  imageState = 'showImage';
  selectedCategory: any | undefined;
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
  selectedSubCategory: any[] = [''];
  selectedIngredient: any[] = [''];
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
  changingErrorData: Subject<boolean> = new Subject();
  variant_submit_data:Array<any> = [];
  productData: any;
  product_status_value: any;
  pro_status: any;
  prv_status: any;
  get_varient_data: Array<string> = [];
  resultArray: { type: string; msg: string }[] = [];
  get_image: any;
  update_img: any;
  table_row: Array<any> = [
    {
      nutrition_name: '',
      nutrition_per_100_gram: [''],
      nutrition_in_this_pack: [''],
    },
  ];
  transactionForm: any;
  proId: string | undefined;
  child_varient_error: any;
  addData:any

  varientError:any;

  // name = 'Angular 4';
  // url: string | ArrayBuffer | null = null;

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
    private router: Router
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
    } else {
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
      msg: 'Product added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
    this.resetInputValue();
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

        this.selectedCategory = this.productData.product.category_id;
        this.get_category_id(this.productData.product.category_id);

        this.selectedSubCategory =
          this.productData.product.category_has_sub_category_id;

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

        this.get_varient_data = this.productData.product_variant;

        this.changeProductStatus();
        this.changePreviewStatus();

        this.variant_array = this.productData.product_variant;
        this.get_image = this.productData.product.product_main_image_name;
      });
  }

  changeProductStatus() {
    if (this.product_status == 1) {
      this.pro_status = true;
    } else {
      this.pro_status = false;
    }
  }

  changePreviewStatus() {
    if (this.chage_priview_status == 1) {
      this.prv_status = true;
    } else {
      this.prv_status = false;
    }
  }

  product_nameformcontrol = new FormControl('', [Validators.required]);
  description_formcontrol = new FormControl('', [Validators.required]);
  varient_formcontrol = new FormControl('', [Validators.required]);
  varientDescription_formcontrol = new FormControl('', [Validators.required]);
  priceformcontrol = new FormControl('', [Validators.required]);

  resetInputValue() {
    if (this.proId) {
      this.getProductData();
    } else {
      this.getCategoryData();
      this.getIngredient();
      this.getAttribute();
      this.getSubCategoryData();

      this.selectedCategory = '';
      this.selectedSubCategory = [''];
      this.product_nameformcontrol.setValue('');
      if (this.imageUploadComponent) {
        this.imageUploadComponent.delete();
      }
      this.description_formcontrol.setValue('');
      this.pro_status = false;

      if (this.variantsComponent) {
        this.variantsComponent.resetVarient();
      }
    }
  }

  save() {
    if (this.proId) {
      if (this.product_image_details) {
        this.update_img = this.product_image_details;
      } else {
        this.update_img = this.get_image;
      }

      // this.Product_image_data()

      this.changingValue.next(true);
      for (let index = 0; index < this.varient_image_details.length; index++) {
        const element = this.varient_image_details[index];
        this.imageLoop = this.varient_image_details[index];
        this.imageIndex = index;
      }
      const update_data = {
        product: {
          product_id: this.proId,
          category_has_sub_category_id: this.selectedSubCategory,
          product_name: this.product_nameformcontrol.value,
          product_main_image: this.update_img,
          product_description: this.description_formcontrol.value,
          product_ingredients: this.selectedIngredient,
          product_in_stock: this.product_status,

          product_rating: 5,
          product_status: this.chage_priview_status,
        },
        product_variant: this.variant_submit_data,
      };

      this.apiService
        .put(update_data, String(this.tokestorage.getToken()), 'products/edit')
        .then((response: any) => {
          this.updated();
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
    } else {
      this.changingValue.next(true);
      for (let index = 0; index < this.varient_image_details.length; index++) {
        const element = this.varient_image_details[index];
        this.imageLoop = this.varient_image_details[index];
        this.imageIndex = index;
      }
    
     if ( this.variant_submit_data.length==0) {
      this.addData= {
        product: {
          product_id: "",
          category_has_sub_category_id: "",
          product_name: "",
          product_main_image: "",
          product_description: "",
          product_ingredients: "",
          product_in_stock: "",

          product_rating: 5,
          product_status: "",
        },
        product_variant: "",
      };
      
     }
     else{
      this.addData = {
        product: {
          product_id: this.proId,
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
     }
     
  

      // };

      this.apiService

        .post(this.addData, String(this.tokestorage.getToken()), 'products/create')
        .then((response: any) => {
          this.product_data = response.result[0];

          this.done();
        })

        .catch((error: any) => {
          this.resultArray = [];

          this.varientError = error.error.detail

          error.error.detail.forEach((item: any) => {
            if (item.loc && item.loc[1] && item.msg) {
              this.resultArray.push({
                type: item.loc[2],
                msg: item.msg,
              });
            }
          });
           this.changingErrorData.next(true);
        

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
  }

  updated() {
    var data1 = {
      msg: 'Product updated to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
    this.resetInputValue();
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
