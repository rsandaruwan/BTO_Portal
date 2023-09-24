import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';
import { AddProductsComponent } from 'src/app/pages/add-products/add-products.component';

@Component({
  selector: 'app-ingredient-popup',
  templateUrl: './ingredient-popup.component.html',
  styleUrls: ['./ingredient-popup.component.scss'],
})
export class IngredientPopupComponent {
  @ViewChild('closebutton') closebutton: any;

  image_details: any;
  ingredient_data: any;

  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;

  attribute_array: Array<string> = [''];
  index: number | undefined;
  userForm: FormGroup;
  textareaContent = '';
  ingredient_image: any;
  resultArray: { type: string; msg: string }[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<IngredientPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public ind_data: any
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    });
  }

  ngOnInit(): void {
    if (this.ind_data) {
      this.getIngredientData();
    }
  }

  image_data(data: any) {
    this.image_details = data.fileName;
  }

  ingredient_formcontrol = new FormControl('', [Validators.required]);
  description_formcontrol = new FormControl('', [Validators.required]);

  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  save() {
    if (this.ind_data) {
      var update_data = {
        ingredient_id: this.ind_data.id,
        ingredient_name: this.ingredient_formcontrol.value,
        ingredient_description: this.description_formcontrol.value,
        ingredient_image: this.image_details,
      };

      this.apiService
        .put(
          update_data,
          String(this.tokestorage.getToken()),
          'ingredient/edit'
        )
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
      const data = {
        ingredient_name: this.ingredient_formcontrol.value,
        ingredient_description: this.description_formcontrol.value,
        ingredient_image: this.image_details,
      };
      this.apiService

        .post(data, String(this.tokestorage.getToken()), 'ingredient/create')
        .then((response: any) => {
          alert();

          this.dialogRef.close(1);
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

  getIngredientData() {
    this.apiService
      .get(
        String(this.tokestorage.getToken()),
        'ingredient/' + this.ind_data.id
      )
      .then((response: any) => {
        this.ingredient_data = response.result;

        this.ingredient_image = this.ingredient_data.ingredient_image;
        this.ingredient_formcontrol.setValue(
          this.ingredient_data.ingredient_name
        );
        this.description_formcontrol.setValue(
          this.ingredient_data.ingredient_description
        );
      });
  }
}
