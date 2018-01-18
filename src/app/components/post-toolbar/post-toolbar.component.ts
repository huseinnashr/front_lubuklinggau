import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostToolbarData } from '../../models/Post';
import { AuthService, PostService, CategoryService } from '../../services/index';
import { USER_TYPE } from '../../models/index';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DisposisiDialogComponent } from '../dialog/disposisi-dialog/disposisi-dialog.component';
import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserlistDialogComponent } from '../dialog/userlist-dialog/userlist-dialog.component';

@Component({
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.scss']
})
export class PostToolbarComponent implements OnDestroy{

  @Input("isShown") isShown: boolean;
  @Input("hideFollower") hideFollower: boolean;
  @Input("data") post: PostToolbarData;

  canEdit: boolean;
  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading = { delete: false, follow: false };

  getCanEdit(){
    if (this.aService.getCurrentUser() == null) return false;
    if (this.aService.getCurrentUser().usertype == USER_TYPE.REGULAR) {
      return this.post.author.id == this.aService.getCurrentUser().id;
    } else if (this.aService.getCurrentUser().usertype == USER_TYPE.ADMIN){
      return this.post.dinasId == this.aService.getCurrentUser().dinas.id;
    } {
      return false;
    }
  }

  isKominfo(){
    if (this.aService.getCurrentUser() == null) return false;
    if (this.aService.getCurrentUser().usertype == USER_TYPE.ADMIN && this.aService.getCurrentUser().dinas.id == 1) {
      return true;
    } 
    return false;
  }

  constructor(
    private aService: AuthService, 
    private pService: PostService, 
    private navigator: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnChanges(){
    if (this.post)
      this.canEdit = this.getCanEdit();
  }

  onFollow(){
    this.isLoading.follow = true;
    this.pService.follow(this.post.id)
    .finally(() => { this.isLoading.follow = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe((res) => {
      this.post.isFollowed = res.following;
      this.post.follower = res.follower;
    });
  }

  onClickFollow(){
    if(this.aService.getCurrentUser() == null || (this.aService.getCurrentUser().usertype == 3 && this.aService.getCurrentUser().id != this.post.author.id)) {
      this.onFollow();
    } else if (this.post.author.id == this.aService.getCurrentUser().id){
      this.snackBar.open('Tidak bisa mengikuti post sendiri', null, { duration: 3000 });
    } else {
      this.dialog.open(UserlistDialogComponent, {
        data: { ids: this.post.follower },
      });
    }
  }

  onDelete(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan menghapus post ini!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
      if (result){
        this.deletePost();
      };
    });
  }
  
  deletePost(){
    this.isLoading.delete = true;
    this.pService.deletePost(this.post)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((removed) => {
        if (removed) {
          this.navigator.navigate(['']);
        }
        this.isLoading.delete = false;
    });
  }

  onDisposisi(): void{
    let dialogRef = this.dialog.open(DisposisiDialogComponent, {
      width: '300px',
      data: this.post,
    });

    dialogRef.afterClosed().subscribe(result => {
        this.canEdit = this.getCanEdit();
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
