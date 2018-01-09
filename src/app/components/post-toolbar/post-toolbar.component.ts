import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostToolbarData } from '../../models/Post';
import { AuthService, PostService, CategoryService } from '../../services/index';
import { USER_TYPE } from '../../models/index';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DisposisiDialogComponent } from '../dialog/disposisi-dialog/disposisi-dialog.component';
import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.scss']
})
export class PostToolbarComponent implements OnDestroy{

  @Input("isShown") isShown: boolean;
  @Input("data") post: PostToolbarData;

  canEdit: boolean;
  private ngUnsubscribe: Subject<any> = new Subject();

  getCanEdit(){
    if (this.aService.getCurrentUser() == null) return false;
    if (this.aService.getCurrentUser().usertype == USER_TYPE.REGULAR) {
      return this.post.authorId == this.aService.getCurrentUser().id;
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
  ) {}

  ngOnChanges(){
    if (this.post)
      this.canEdit = this.getCanEdit();
  }

  onFollowed(){
    this.post.isFollowed = !this.post.isFollowed;
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
    this.pService.deletePost(this.post)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((removed) => {
        if (removed) {
          this.navigator.navigate(['']);
        }
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
