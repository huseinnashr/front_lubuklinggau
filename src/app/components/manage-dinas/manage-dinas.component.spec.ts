import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDinasComponent } from './manage-dinas.component';

describe('ManageDinasComponent', () => {
  let component: ManageDinasComponent;
  let fixture: ComponentFixture<ManageDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
