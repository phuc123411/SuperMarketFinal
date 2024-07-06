import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeatureProductComponent } from './customer-feature-product.component';

describe('CustomerFeatureProductComponent', () => {
  let component: CustomerFeatureProductComponent;
  let fixture: ComponentFixture<CustomerFeatureProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFeatureProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFeatureProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
