import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDonePopupComponent } from './dynamic-done-popup.component';

describe('DynamicDonePopupComponent', () => {
  let component: DynamicDonePopupComponent;
  let fixture: ComponentFixture<DynamicDonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDonePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
