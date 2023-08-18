import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-confirmation-popup',
  templateUrl: './dynamic-confirmation-popup.component.html',
  styleUrls: ['./dynamic-confirmation-popup.component.scss']
})
export class DynamicConfirmationPopupComponent implements OnInit {
constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
   
  }
}
