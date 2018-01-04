import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailPageComponent } from './post-detail-page.component';

describe('PostPageComponent', () => {
  let component: PostDetailPageComponent;
  let fixture: ComponentFixture<PostDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
