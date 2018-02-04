import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/index';
import { USER_TYPE } from '../../models/index';

@Component({
  selector: 'app-utama-page',
  templateUrl: './utama-page.component.html',
  styleUrls: ['./utama-page.component.scss']
})
export class UtamaPageComponent implements OnInit, OnDestroy {

  public posts: Post[];
  public needApprovalPost: Post[];
  public customizedPost: Post[];
  public followedPost: Post[];
  public customizedFilter;
  public followedPostFilter;
  public isLoading = { post: true, customizedPost: true, followedPost: true, needApprovalPost: true };

  constructor(private pService: PostService, private aService: AuthService) { }
  private ngUnsubscribe: Subject<any> = new Subject();

  ngOnInit() {    

    if (this.isKominfo()){
      this.pService.getPosts({ approved: false }, false)
      .finally(() => { this.isLoading.needApprovalPost = false })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (result) => {
          if(result)
            this.needApprovalPost = result.rows;
        },
      )
    }

    if (this.isAdmin()) {
      this.customizedFilter = { req: 'terbaru', size: 5, isAnswered: false, dinasId: this.aService.getCurrentUser().dinas.id };
    } else if (this.canPost()) {
      this.customizedFilter = { req: 'terbaru', size: 5, authorId: this.aService.getCurrentUser().id, self: true };
      this.followedPostFilter = { req: 'terbaru', size: 5, authorId: this.aService.getCurrentUser().id, followed: true };
    }

    if (this.customizedFilter){
      this.pService.getPosts(this.customizedFilter, false)
      .finally(() => { this.isLoading.customizedPost = false })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (result) => {
          if(result)
            this.customizedPost = result.rows;
        },
      )
    }

    if (this.followedPostFilter){
      this.pService.getPosts(this.followedPostFilter, false)
      .finally(() => { this.isLoading.followedPost = false })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (result) => {
          if(result)
            this.followedPost = result.rows;
        },
      )
    }

    this.pService.getPosts({req: 'terbaru', size: 5})
    .finally(() => { this.isLoading.post = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (result) => {
        if(result)
          this.posts = result.rows;
      },
    )
  }

  isKominfo(){
    return (this.isAdmin() && this.aService.getCurrentUser().dinas.id == 1);
  }

  isAdmin(){
    return (this.aService.getCurrentUser() && this.aService.getCurrentUser().usertype == USER_TYPE.ADMIN);
  }

  canPost(){
    return (this.aService.getCurrentUser() && this.aService.getCurrentUser().usertype == USER_TYPE.REGULAR);
  }


  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
