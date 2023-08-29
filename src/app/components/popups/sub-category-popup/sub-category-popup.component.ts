import { Attribute, Component, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';
import { CategoryInterface } from 'src/app/modals/category.model';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import {
  EditSubCategoryIntarface,
  SubCategoryCategoryIntarface,
} from 'src/app/modals/edit.category.model';

@Component({
  selector: 'app-sub-category-popup',
  templateUrl: './sub-category-popup.component.html',
  styleUrls: ['./sub-category-popup.component.scss'],
})
export class SubCategoryPopupComponent {
  @ViewChild('closebutton') closebutton: any;
  selectedCategory: Array<any> = [
    { category: '', attributes: [], attribue_names: [] },
  ];
  selected_attributes: string[] = [];
  userForm: FormGroup;
  selectedValuesArray: string[] = [];
  subcategory_data: any[] = [];

  categoriesArray: any[] = [];
  att_name: any;
  category_details: any;
  attNameArray: any[] = [];
  objectArray: any[] = [];

  sub_category_nameformcontrol = new FormControl('', [Validators.required]);

  categories: CategoryInterface[] = [];
  attributes: AttributeIntarface[] = [];
  sub_category: EditSubCategoryIntarface = {
    sub_category_name: '',
    categories: [],
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public sub_cat_data: any
  ) {
    this.userForm = this.fb.group({
      name: [],
      attribute: this.fb.array([this.fb.control(null)]),
    });
  }

  ngOnInit(): void {
    this.getCategoryData();
    this.getAttributeData();
  }

  addAttribute(): void {
    this.selectedCategory.push([{ category: '', attributes: [] }]);
    (this.userForm.get('attribute') as FormArray).push(this.fb.control(null));
  }

  removecategory(index: any) {
    (this.userForm.get('attribute') as FormArray).removeAt(index);
  }

  getAttributesFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('attribute')).controls;
  }

  onSelectionChange(id: any, array_index: any) {
    // This function catches an array of selected attribute IDs and the array index of the sub category

    this.objectArray = id.map((id: any) => ({ att_id: id }));

    if (
      typeof this.selectedCategory[array_index].attribue_names !==
        'undefined' &&
      this.selectedCategory[array_index].attribue_names !== null
    ) {
      // If attribute name array is defined then clear it
      this.selectedCategory[array_index].attribue_names.length = 0;
    } else {
      this.selectedCategory[array_index].attribue_names = []; // else create the attribute names array
    }

    if (this.objectArray.length > 0) {
      for (const att_item of this.objectArray) {
        // Loop through the selected attribue Ids array
        const targetAttribute = this.attributes.find(
          (item) => item.attribute_id === att_item.att_id
        ); // Match the selected ID with the attibue API result to get the attribute name

        if (targetAttribute) {
          // If attribute name exists then push to attribute names array
          const attributeName = targetAttribute.attribute_name;
          this.selectedCategory[array_index].attribue_names.push(attributeName);
        }
      }
    }

    return;

    this.objectArray.forEach((element) => {
      console.log(element);

      this.apiService
        .get(
          String(this.tokestorage.getToken()),
          'attributes/view?page_id=1&attribute_id=' + element.att_id
        )
        .then((response: any) => {
          this.att_name = response.result[0].attribute_name;

          this.attNameArray.push(this.att_name);
          console.log(this.attNameArray);
        });
    });
  }

  closebtn(id: any) {
    alert(id);

    this.attNameArray.splice(id, 1);
  }
  save(){
    // if (this.cat_data != undefined) {
    //   var update_data = {
    //     category_id: this.cat_data.id,
    //     category_name: this.category_nameformcontrol.value,
    //   };
  
    //   this.apiService
    //     .put(update_data, String(this.tokestorage.getToken()), 'category/edit')
    //     .then((response: any) => {
    //       this.closebutton.nativeElement.click();
    //       this.updated();
    //     })
    //     .catch((error: any) => {});
    // } else 
    
    {
      const data = {
        sub_category_name: this.sub_category_nameformcontrol.value,
        categories: new Array<any>(),
      };
  
      for (const categorie of this.selectedCategory) {
        data.categories.push({
          attribute_id: categorie.attributes,
          category_id: categorie.category,
        });
      }
  
      {
        this.apiService
  
          .post(data, String(this.tokestorage.getToken()), 'sub-category/create')
          .then((response: any) => {
            this.subcategory_data = response.result[0];
            this.closebutton.nativeElement.click();
            this.done();
          })
          .catch((error: any) => {
            // this.toste.error(error.error.detail.message);
          });
      }
    }
  }
  

  done() {
    var data1 = {
      msg: 'sUb category added to the system Successfully!',
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

  getCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'category')
      .then((response: any) => {
        this.categories = response.result.data;
      });
  }

  getAttributeData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'attributes/view')
      .then((response: any) => {
        this.attributes = response.result;
      });
  }
}
