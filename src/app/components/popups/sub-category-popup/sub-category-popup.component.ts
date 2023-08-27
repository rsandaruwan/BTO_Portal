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



@Component({
  selector: 'app-sub-category-popup',
  templateUrl: './sub-category-popup.component.html',
  styleUrls: ['./sub-category-popup.component.scss'],
})
export class SubCategoryPopupComponent {
  @ViewChild('closebutton') closebutton: any;
  selectedCategory: Array<any> = [{ category: '', attributes: [] }];
  userForm: FormGroup;
  selectedValuesArray: string[] = [];
  subcategory_data: any[] = [];

  category_details:any

  sub_category_nameformcontrol = new FormControl('', [Validators.required]);

  categories: CategoryInterface[] = [];
  attributes: AttributeIntarface[] = [];

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

  onSelectionChange(): void {}

  closebtn(id: any) {
    alert(id);

    if (this.selectedCategory) {
      this.selectedCategory[0].attribute.splice(id, 1);
    }
  }
  save() {


    

    {
      const data = {
        sub_category_name: this.sub_category_nameformcontrol.value,
        categories: [
          {
            category_id: 'string',
            attribute_id: ['string'],
          },
        ],
      };
      this.apiService

        .post(data, String(this.tokestorage.getToken()), 'category/create')
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

  done() {
    var data1 = {
      msg: 'Category added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }

  getCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'category' )
      .then((response: any) => {
    
    
        this.categories = response.result.data

      });
  }

  getAttributeData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'attributes/view' )
      .then((response: any) => {
    
    
        this.attributes = response.result
        console.log(response.result.data)
      });
  }
}
