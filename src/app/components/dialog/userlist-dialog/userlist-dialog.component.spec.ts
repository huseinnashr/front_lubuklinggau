import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistDialogComponent } from './userlist-dialog.component';

describe('UserlistDialogComponent', () => {
  let component: UserlistDialogComponent;
  let fixture: ComponentFixture<UserlistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
