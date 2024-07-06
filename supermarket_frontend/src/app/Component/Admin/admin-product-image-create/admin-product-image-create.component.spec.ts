import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductImageCreateComponent } from './admin-product-image-create.component';

describe('AdminProductImageCreateComponent', () => {
  let component: AdminProductImageCreateComponent;
  let fixture: ComponentFixture<AdminProductImageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductImageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductImageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
