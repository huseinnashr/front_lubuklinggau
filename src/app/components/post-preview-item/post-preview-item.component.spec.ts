import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPreviewItemComponent } from './post-preview-item.component';

describe('PostPreviewItemComponent', () => {
  let component: PostPreviewItemComponent;
  let fixture: ComponentFixture<PostPreviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPreviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPreviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
