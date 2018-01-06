import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposisiDialogComponent } from './disposisi-dialog.component';

describe('DisposisiDialogComponent', () => {
  let component: DisposisiDialogComponent;
  let fixture: ComponentFixture<DisposisiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposisiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposisiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
