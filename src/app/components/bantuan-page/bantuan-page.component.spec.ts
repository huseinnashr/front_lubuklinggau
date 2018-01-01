import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BantuanPageComponent } from './bantuan-page.component';

describe('BantuanPageComponent', () => {
  let component: BantuanPageComponent;
  let fixture: ComponentFixture<BantuanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BantuanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BantuanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
