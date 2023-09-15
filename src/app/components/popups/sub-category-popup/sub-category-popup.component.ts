import { Component, ViewChild, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';
import { CategoryInterface } from 'src/app/modals/category.model';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { EditSubCategoryIntarface } from 'src/app/modals/edit.category.model';

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
  setCategoryvalue: any;
  setAttribute: any[] = [];

  category_array_length: any[] = [];
  resultArray: { type: string; msg: string }[] = [];

  sub_category_nameformcontrol = new FormControl('', [Validators.required]);
  subCategoryData: any;
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
    this.getSubCategoryData();
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
      this.apiService
        .get(
          String(this.tokestorage.getToken()),
          'attributes/view?page_id=1&attribute_id=' + element.att_id
        )
        .then((response: any) => {
          this.att_name = response.result[0].attribute_name;

          this.attNameArray.push(this.att_name);
        });
    });
  }

  closebtn(id: any) {
    this.attNameArray.splice(id, 1);
  }
  save() {
    if (this.sub_cat_data != undefined) {
      var update_data = {
        sub_category_id: this.subCategoryData.sub_category_id,
        sub_category_name: this.subCategoryData.sub_category_name,
        categories: new Array<any>(),
      };

      for (const categorie of this.selectedCategory) {
        update_data.categories.push({
          attribute_id: categorie.attributes,
          category_id: categorie.category,
        });
      }

      this.apiService
        .put(
          update_data,
          String(this.tokestorage.getToken()),
          'sub-category/edit'
        )
        .then((response: any) => {
          this.closebutton.nativeElement.click();
          this.updated();
        })
        .catch((error: any) => {});
    } else {
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

          .post(
            data,
            String(this.tokestorage.getToken()),
            'sub-category/create'
          )

          .then((response: any) => {
            this.subcategory_data = response.result[0];

            this.closebutton.nativeElement.click();

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

          console.log("arr",  this.resultArray);
          
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
      .get(String(this.tokestorage.getToken()), 'attributes/all')
      .then((response: any) => {
        this.attributes = response.result;
      });
  }
  getSubCategoryData() {
    this.apiService
      .get(
        String(this.tokestorage.getToken()),
        'sub-category/' + this.sub_cat_data.id
      )
      .then((response: any) => {
        this.subCategoryData = response.result;

        if (this.subCategoryData) {
          this.sub_category_nameformcontrol.setValue(
            this.subCategoryData.sub_category_name
          );
          this.selectedCategory = [];

          this.subCategoryData.sub_category_has_category_details.forEach(
            (element: any) => {
              var attributes1: Array<any> = [];
              var attribue_names1: Array<any> = [];
              element.attributes_details.forEach((att: any) => {
                attributes1.push(att.attribute_id);
                attribue_names1.push(att.attribute_name);
              });
              var ss = {
                category: element.category_details.category_id,
                attributes: attributes1,
                attribue_names: attribue_names1,
              };
              this.selectedCategory.push(ss);
            }
          );
        }

        // for (let i = 0; i < this.subCategoryData.sub_category_has_category_details.length-1; i++) {
        //   this.category_array_length.push(this.subCategoryData.sub_category_has_category_details[i])

        //   this.selectedCategory.push([{ category:this.category_array_length[0].category_name , attributes: [] }]);
        //   (this.userForm.get('attribute') as FormArray).push(this.fb.control(null));

        // }
        // for (let i = 1; i <= this.subCategoryData.sub_category_has_category_details.length; i++) {
        //   this.category_array_length.push(this.subCategoryData.sub_category_has_category_details[i])

        // }
      });
  }
}
