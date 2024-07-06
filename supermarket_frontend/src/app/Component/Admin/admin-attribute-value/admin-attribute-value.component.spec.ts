import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeValueComponent } from './admin-attribute-value.component';

describe('AdminAttributeValueComponent', () => {
  let component: AdminAttributeValueComponent;
  let fixture: ComponentFixture<AdminAttributeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
