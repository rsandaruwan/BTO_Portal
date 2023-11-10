import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';

@Component({
  selector: 'app-test-popup',
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.scss']
})
export class TestPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<TestPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriesComponent,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
