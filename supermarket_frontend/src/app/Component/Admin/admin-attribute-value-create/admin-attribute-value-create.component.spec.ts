import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeValueCreateComponent } from './admin-attribute-value-create.component';

describe('AdminAttributeValueCreateComponent', () => {
  let component: AdminAttributeValueCreateComponent;
  let fixture: ComponentFixture<AdminAttributeValueCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeValueCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeValueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
