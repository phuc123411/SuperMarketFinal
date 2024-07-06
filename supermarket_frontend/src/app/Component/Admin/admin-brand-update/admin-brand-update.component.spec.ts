import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandUpdateComponent } from './admin-brand-update.component';

describe('AdminBrandUpdateComponent', () => {
  let component: AdminBrandUpdateComponent;
  let fixture: ComponentFixture<AdminBrandUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrandUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrandUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
