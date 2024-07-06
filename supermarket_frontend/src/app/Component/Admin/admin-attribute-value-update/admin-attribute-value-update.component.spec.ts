import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeValueUpdateComponent } from './admin-attribute-value-update.component';

describe('AdminAttributeValueUpdateComponent', () => {
  let component: AdminAttributeValueUpdateComponent;
  let fixture: ComponentFixture<AdminAttributeValueUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeValueUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeValueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
