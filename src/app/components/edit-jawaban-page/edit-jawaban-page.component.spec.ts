import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJawabanPageComponent } from './edit-jawaban-page.component';

describe('EditJawabanPageComponent', () => {
  let component: EditJawabanPageComponent;
  let fixture: ComponentFixture<EditJawabanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJawabanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJawabanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
