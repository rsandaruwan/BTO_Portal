import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-done-popup',
  templateUrl: './dynamic-done-popup.component.html',
  styleUrls: ['./dynamic-done-popup.component.scss']
})
export class DynamicDonePopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DynamicDonePopupComponent>){}
    ngOnInit(): void {
      setTimeout(() => {
        this. closeDialog();
      }, 2500);
    }
    closeDialog() {
      //Write your stuff here
      this.dialogRef.close(); // <- Closes the dialog
    }
  }


  // var data = {
  //   location_id: id,
  // };

  // this.apiService
  //   .put(
  //     data,
  //     String(this.tokestorage.getToken()),
  //     'org-location/delete-location'
  //   )
  //   .then((response: any) => {
  //     var data1 = {
  //       msg: 'You have successfully deleted the place from the Organization!',
  //     };
  //     this.dialog.open(DynamicDonePopupComponent, {
  //       width: '30vw',

  //       data: data1,
  //     });
  //     this.getLocationData();
  //   })
  //   .catch((error: any) => {});
