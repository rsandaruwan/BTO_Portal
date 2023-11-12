import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryPopupComponent } from './recipe-category-popup.component';

describe('RecipeCategoryPopupComponent', () => {
  let component: RecipeCategoryPopupComponent;
  let fixture: ComponentFixture<RecipeCategoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCategoryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
