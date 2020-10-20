import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingLocationComponent } from './pricing-location.component';

describe('PricingLocationComponent', () => {
  let component: PricingLocationComponent;
  let fixture: ComponentFixture<PricingLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
