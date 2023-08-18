import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicConfirmationPopupComponent } from './dynamic-confirmation-popup.component';

describe('DynamicConfirmationPopupComponent', () => {
  let component: DynamicConfirmationPopupComponent;
  let fixture: ComponentFixture<DynamicConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicConfirmationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// var data = {
//   title: 'Delete place? ',
//   text: 'Are you sure you want delete this place?',
//   msg_type: 'warning',
//   msg: "By Deleting this place you won’t be able to revert. Please ensure you're absolutely certain before proceeding.",
//   positive_button: 'yes',
//   negative_button: 'cancel',
// };
// var dialogRef = this.dialog.open(DynamicConfirmationPopupComponent, {
//   width: '35vw',

//   data: data,
// });

// dialogRef.afterClosed().subscribe((result) => {
//   if (result == '1') {
//     this.DeletePermanent(id);
//   }
// });
