import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePopupComponent } from './attribute-popup.component';

describe('AttributePopupComponent', () => {
  let component: AttributePopupComponent;
  let fixture: ComponentFixture<AttributePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
