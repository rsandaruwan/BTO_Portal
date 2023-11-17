import { Component, ViewChild, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-recipe-category-popup',
  templateUrl: './recipe-category-popup.component.html',
  styleUrls: ['./recipe-category-popup.component.scss']
})
export class RecipeCategoryPopupComponent {

  @ViewChild('closebutton') closebutton: any;

  attribute_array: Array<string> = [''];
  index: number | undefined;
  userForm: FormGroup;
  resultArray: { type: string; msg: string }[] = [];


  recipe_data: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<RecipeCategoryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public att_data: any
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    });
  }

  ngOnInit(): void {


    if (this.att_data) {
      this.recipe_category_name.setValue(this.att_data.name);
    }
  }

  recipe_category_name = new FormControl('', [Validators.required]);



  save() {

    if (this.att_data ) {
      var update_data = {
        recipe_category_id: this.att_data.id,
        recipe_category_name: this.recipe_category_name.value,
      };

      this.apiService
        .put(update_data, String(this.tokestorage.getToken()), 'recipe-category/edit')
        .then((response: any) => {
          // this.closebutton.nativeElement.click();
          this.updated();
          this.dialogRef.close();
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

      }else{
          const data = {
            recipe_category_name: this.recipe_category_name.value,
          };
          this.apiService
      
            .post(data, String(this.tokestorage.getToken()), 'recipe-category/create')
            .then((response: any) => {
              this.recipe_data = response.result;
      
             
              this.done();
              this.dialogRef.close();
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
      msg: 'Recipe category added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
  updated() {
    var data1 = {
      msg: 'Recipe category  updated to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
}
