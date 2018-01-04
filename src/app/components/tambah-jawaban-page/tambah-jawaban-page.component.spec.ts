import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahJawabanPageComponent } from './tambah-jawaban-page.component';

describe('TambahJawabanPageComponent', () => {
  let component: TambahJawabanPageComponent;
  let fixture: ComponentFixture<TambahJawabanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahJawabanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahJawabanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
