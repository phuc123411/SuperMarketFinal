import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeCreateComponent } from './admin-attribute-create.component';

describe('AdminAttributeCreateComponent', () => {
  let component: AdminAttributeCreateComponent;
  let fixture: ComponentFixture<AdminAttributeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
