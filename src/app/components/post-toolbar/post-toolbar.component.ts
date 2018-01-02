import { Component, OnInit, Input } from '@angular/core';
import { PostToolbarData } from '../../models/Post';

@Component({
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.scss']
})
export class PostToolbarComponent {

  @Input("isShown") isShown: boolean;
  @Input("data") post: PostToolbarData;

  constructor() { }

  onFollowed(){
    this.post.isFollowed = !this.post.isFollowed;
  }

  onReported(){
    if (this.post.isReported)
      return;
    this.post.isReported = true;
  }
}
