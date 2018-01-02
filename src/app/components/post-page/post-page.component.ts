import { Component, OnInit } from '@angular/core';
import { Post, Reply } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post: Post;
  private postId: string;
  public reply: Reply;

  constructor(private route:ActivatedRoute, private pService: PostService) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.post = this.pService.getPostById(this.postId);
    this.reply = this.pService.getReplyByPostId(this.postId);
  }

  onJSetting(){};

  onJDelete(){};
}
