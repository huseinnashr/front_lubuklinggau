import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post, Reply } from '../../models/Post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService, CategoryService } from '../../services/index';
import { USER_TYPE } from '../../models/index';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.scss']
})

export class PostDetailPageComponent implements OnInit, OnDestroy {

  public post: Post;
  private postId: string;
  public reply: Reply;
  public canAnswer: boolean = false;

  private ngUnsubscribe: Subject<any> = new Subject();
  
  constructor(
    private route:ActivatedRoute, 
    private pService: PostService,
    private navigator: Router,
    private aService: AuthService,
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id']; 
    this.pService.getPostById(this.postId)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((post) => {
        if (!post){
          this.navigator.navigate(['/404']);
        } else {
          this.post = post;
          this.canAnswer = this.checkCanAnswer();
        }
    });

    this.pService.getReplyByPostId(this.postId)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((reply) => {
        if (reply){
          this.reply = reply;
        }
    });
  }

  onDeleteReply(){
    this.pService.deleteReply(this.reply, this.post)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((removed) => {
        if (removed){
          this.reply = null;
          this.post.isAnswered = false;
        }
    });
  }

  checkCanAnswer(){
    if (this.aService.getCurrentUser().usertype == USER_TYPE.REGULAR) 
      return false;
    else if (this.aService.getCurrentUser().usertype == USER_TYPE.ADMIN)
      return this.aService.getCurrentUser().dinas.id == this.post.dinasId;
    else if (this.aService.getCurrentUser().usertype == USER_TYPE.SUPERUSER) {
      return false;
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
