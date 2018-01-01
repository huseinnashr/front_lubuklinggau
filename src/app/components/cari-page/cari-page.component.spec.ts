import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CariPageComponent } from './cari-page.component';

describe('CariPageComponent', () => {
  let component: CariPageComponent;
  let fixture: ComponentFixture<CariPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CariPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CariPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
