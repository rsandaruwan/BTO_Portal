import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientPopupComponent } from './ingredient-popup.component';

describe('IngredientPopupComponent', () => {
  let component: IngredientPopupComponent;
  let fixture: ComponentFixture<IngredientPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
