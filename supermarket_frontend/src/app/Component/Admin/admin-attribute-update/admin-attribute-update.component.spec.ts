import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeUpdateComponent } from './admin-attribute-update.component';

describe('AdminAttributeUpdateComponent', () => {
  let component: AdminAttributeUpdateComponent;
  let fixture: ComponentFixture<AdminAttributeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
