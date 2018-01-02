import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-preview-item',
  templateUrl: './post-preview-item.component.html',
  styleUrls: ['./post-preview-item.component.scss']
})
export class PostPreviewItemComponent {

  @Input() post: Post;
  

}
