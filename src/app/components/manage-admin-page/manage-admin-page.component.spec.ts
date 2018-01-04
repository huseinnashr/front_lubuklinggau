import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminPageComponent } from './manage-admin-page.component';

describe('ManageAdminPageComponent', () => {
  let component: ManageAdminPageComponent;
  let fixture: ComponentFixture<ManageAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
