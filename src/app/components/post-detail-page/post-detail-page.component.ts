import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Post, Reply } from '../../models/Post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService, CategoryService } from '../../services/index';
import { USER_TYPE } from '../../models/index';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AuthorDialogComponent } from '../dialog/author-dialog/author-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Quill } from 'quill';
import * as q from 'quill';
const quill: any = q;

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.scss']
})

export class PostDetailPageComponent implements OnInit, OnDestroy {

  public post: Post;
  private postId: string;
  public reply: Reply;
  public description: string;
  public canAnswer: boolean = false;
  quillInstance: Quill;

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
          const delta = JSON.parse(this.post.description);
          if (delta.ops.length != 1 || delta.ops[0].insert != '\n'){
            this.quillInstance.setContents(delta);
            this.post.description = this.quillInstance.root.innerHTML;
          } else {
            this.post.description = null;
          }
        }
    });

    this.pService.getReplyByPostId(this.postId)
      .finally(() => { this.isLoading.reply = false;})
      .takeUntil(this.ngUnsubscribe)
      .subscribe((reply) => {
        if (reply){
          this.reply = reply;
          const delta = JSON.parse(this.reply.body);
          if (delta.ops.length != 1 || delta.ops[0].insert != '\n'){
            this.quillInstance.setContents(delta);
            this.reply.body = this.quillInstance.root.innerHTML;
          } else {
            this.reply.body = null;
          }
        }
    });
  }

  ngAfterViewInit(){
    this.quillInstance = new quill(document.getElementById("quill"));
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
    this.isLoading.reply = true;
    this.pService.deleteReply(this.reply, this.post)
      .finally(() => { this.isLoading.reply = false })
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
