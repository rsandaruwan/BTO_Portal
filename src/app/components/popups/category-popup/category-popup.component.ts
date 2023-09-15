import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';

import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss'],
})
export class CategoryPopupComponent {
  @ViewChild('closebutton') closebutton: any;
  selectedSubcategory: string | undefined;
  category_data: any;
  errors: any;
  resultArray: { type: string; msg: string }[] = [];

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CategoryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public cat_data: any
  ) {}
  ngOnInit(): void {
    if (this.cat_data) {
      this.category_nameformcontrol.setValue(this.cat_data.categoryName);
    }
  }

  category_nameformcontrol = new FormControl('', [Validators.required]);

  save() {
    if (this.cat_data != undefined) {
      var update_data = {
        category_id: this.cat_data.id,
        category_name: this.category_nameformcontrol.value,
      };

      this.apiService
        .put(update_data, String(this.tokestorage.getToken()), 'category/edit')
        .then((response: any) => {
          this.closebutton.nativeElement.click();
          this.updated();
          this.cat_data.functionToCall()
          
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
        category_name: this.category_nameformcontrol.value,
      };
      this.apiService

        .post(data, String(this.tokestorage.getToken()), 'category/create')
        .then((response: any) => {
          this.category_data = response.result[0];

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
  
}
