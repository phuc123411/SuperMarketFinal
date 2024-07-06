import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeComponent } from './admin-attribute.component';

describe('AdminAttributeComponent', () => {
  let component: AdminAttributeComponent;
  let fixture: ComponentFixture<AdminAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
