import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtamaPageComponent } from './utama-page.component';

describe('UtamaPageComponent', () => {
  let component: UtamaPageComponent;
  let fixture: ComponentFixture<UtamaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtamaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtamaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
