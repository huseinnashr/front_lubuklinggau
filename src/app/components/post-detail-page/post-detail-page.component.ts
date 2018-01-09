import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post, Reply } from '../../models/Post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService, CategoryService } from '../../services/index';
import { USER_TYPE } from '../../models/index';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AuthorDialogComponent } from '../dialog/author-dialog/author-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  public isLoading = { post: true, reply: true };
  
  constructor(
    private route:ActivatedRoute, 
    private pService: PostService,
    private navigator: Router,
    public aService: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id']; 
    this.pService.getPostById(this.postId)
      .finally(() => { this.isLoading.post = false })
      .takeUntil(this.ngUnsubscribe)
      .subscribe((post) => {
        if (!post){
          this.navigator.navigate(['/404']);
        } else {
          this.post = post;
        }
    });

    this.pService.getReplyByPostId(this.postId)
      .finally(() => { this.isLoading.reply = false;})
      .takeUntil(this.ngUnsubscribe)
      .subscribe((reply) => {
        if (reply){
          this.reply = reply;
        }
    });
  }

  onDeleteReply(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan menghapus reply post ini!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
      if (result){
        this.deleteReply();
      };
    });
  }

  deleteReply(){
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
    if (this.aService.getCurrentUser() == null || this.post == null) return false;
    
    if (this.aService.getCurrentUser().usertype == USER_TYPE.REGULAR)
      return false;
    else if (this.aService.getCurrentUser().usertype == USER_TYPE.ADMIN)
      return this.aService.getCurrentUser().dinas.id == this.post.dinasId;
    else if (this.aService.getCurrentUser().usertype == USER_TYPE.SUPERUSER) {
      return false;
    }
  }

  showAuthor(id){
    if (this.aService.getCurrentUser() != null && this.aService.getCurrentUser().usertype < USER_TYPE.REGULAR){
      this.dialog.open(AuthorDialogComponent, {
        data: { id },
      });
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
