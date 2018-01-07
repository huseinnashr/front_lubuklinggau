import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../services/index';
import { AuthorDialogComponent } from '../dialog/author-dialog/author-dialog.component';
import { USER_TYPE } from '../../models/index';

@Component({
  selector: 'app-post-preview-item',
  templateUrl: './post-preview-item.component.html',
  styleUrls: ['./post-preview-item.component.scss']
})
export class PostPreviewItemComponent {

  @Input() post: Post;
  
  constructor(
    private dialog: MatDialog,
    public aService: AuthService,
  ){}

  showAuthor(id){
    if (this.aService.getCurrentUser() != null && this.aService.getCurrentUser().usertype < USER_TYPE.REGULAR){
      this.dialog.open(AuthorDialogComponent, {
        data: { id },
      });
    }
  }

}
