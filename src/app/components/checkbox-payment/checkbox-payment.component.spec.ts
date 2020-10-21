import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxPaymentComponent } from './checkbox-payment.component';

describe('CheckboxPaymentComponent', () => {
  let component: CheckboxPaymentComponent;
  let fixture: ComponentFixture<CheckboxPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
