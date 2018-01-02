import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-utama-page',
  templateUrl: './utama-page.component.html',
  styleUrls: ['./utama-page.component.scss']
})
export class UtamaPageComponent implements OnInit {

  public posts: Post[];

  constructor(private pService: PostService) { }

  ngOnInit() {
    this.posts = this.pService.getPostsPreview();
  }

}
