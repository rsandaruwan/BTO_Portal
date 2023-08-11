import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryPopupComponent } from './sub-category-popup.component';

describe('SubCategoryPopupComponent', () => {
  let component: SubCategoryPopupComponent;
  let fixture: ComponentFixture<SubCategoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
