import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProgressDialogComponent } from './action-progress-dialog.component';

describe('ActionProgressDialogComponent', () => {
  let component: ActionProgressDialogComponent;
  let fixture: ComponentFixture<ActionProgressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionProgressDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionProgressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
