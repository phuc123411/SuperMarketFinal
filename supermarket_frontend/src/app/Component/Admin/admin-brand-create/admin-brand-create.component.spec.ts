import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandCreateComponent } from './admin-brand-create.component';

describe('AdminBrandCreateComponent', () => {
  let component: AdminBrandCreateComponent;
  let fixture: ComponentFixture<AdminBrandCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrandCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
