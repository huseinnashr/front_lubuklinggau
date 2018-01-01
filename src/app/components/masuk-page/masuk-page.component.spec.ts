import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasukPageComponent } from './masuk-page.component';

describe('MasukPageComponent', () => {
  let component: MasukPageComponent;
  let fixture: ComponentFixture<MasukPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasukPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasukPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
