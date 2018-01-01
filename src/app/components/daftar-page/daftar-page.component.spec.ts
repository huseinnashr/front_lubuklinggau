import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarPageComponent } from './daftar-page.component';

describe('DaftarPageComponent', () => {
  let component: DaftarPageComponent;
  let fixture: ComponentFixture<DaftarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
