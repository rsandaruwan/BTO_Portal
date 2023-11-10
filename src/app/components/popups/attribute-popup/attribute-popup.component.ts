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
  selector: 'app-attribute-popup',
  templateUrl: './attribute-popup.component.html',
  styleUrls: ['./attribute-popup.component.scss'],
})
export class AttributePopupComponent {
  @ViewChild('closebutton') closebutton: any;

  attribute_array: Array<string> = [''];
  index: number | undefined;
  userForm: FormGroup;
  resultArray: { type: string; msg: string }[] = [];


  attribute_data: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AttributePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public att_data: any
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    });
  }

  ngOnInit(): void {


    if (this.att_data) {
      this.attribute_nameformcontrol.setValue(this.att_data.name);
    }
  }

  attribute_nameformcontrol = new FormControl('', [Validators.required]);

  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(this.fb.control(null));
    this.attribute_array.push('');
  }

  removePhone(index: any) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('phones')).controls;
  }
  returnArray(): Array<string> {
    return this.attribute_array;
  }

  save() {

    if (this.att_data ) {
      var update_data = {
        attribute_id: this.att_data.id,
        attribute_name: this.attribute_nameformcontrol.value,
      };

      this.apiService
        .put(update_data, String(this.tokestorage.getToken()), 'attributes/edit')
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
            attribute_name: this.attribute_nameformcontrol.value,
          };
          this.apiService
      
            .post(data, String(this.tokestorage.getToken()), 'attributes/create')
            .then((response: any) => {
              this.attribute_data = response.result[0];
      
              // this.closebutton.nativeElement.click();
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
      msg: 'Attribute added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
  updated() {
    var data1 = {
      msg: 'Attribute updated to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
}
