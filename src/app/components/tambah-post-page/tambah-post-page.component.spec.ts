import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahPostPageComponent } from './tambah-post-page.component';

describe('TambahPostPageComponent', () => {
  let component: TambahPostPageComponent;
  let fixture: ComponentFixture<TambahPostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahPostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
