import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { CategoryService, AuthService } from '../../services/index';
import { Subject } from 'rxjs';
import { Category, USER_TYPE } from '../../models/index';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { Quill } from 'quill';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrls: ['./edit-post-page.component.scss']
})
export class EditPostPageComponent implements OnInit, OnDestroy {

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);
  
  category: string;
  categories: Category[];
  quill: Quill;

  post: Post;
  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading = { post: true, edit: false };

  constructor(
    private route: ActivatedRoute,
    private navigator: Router,
    private pService: PostService,
    public cService: CategoryService,
    private aService: AuthService,
    private dialog: MatDialog,
  ) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];
    this.pService.getPostById(postId)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((post) => {
      if (!post){
        this.navigator.navigate(['/404']);
      }
      this.post = post;    
      this.titleFormControl.setValue(this.post.title);
      this.category = this.post.categoryId.toString();
    });
    this.cService.getCategories()
    .finally(() => { this.isLoading.post = false; })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (categories) => {
        this.categories = categories;
      }, (e) => { console.log(e); },
    );
  }

  onTextEditorCreated($event: Quill){
    this.quill = $event;
    this.quill.setContents(JSON.parse(this.post.description));
  }

  onEditPost(){
    const isKominfo = this.aService.getCurrentUser().usertype == USER_TYPE.ADMIN 
      && this.aService.getCurrentUser().dinas.id == 1;
    
    if (isKominfo){
      this.editPost(isKominfo);
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { description: `Post yang diedit akan ditinjau kembali sebelum ditampilkan!`, action: 'Yakin' },
      });
  
      dialogRef.afterClosed()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => {
        if (result) {
          this.editPost(isKominfo);
        }
      });
    }
  }

  editPost(isKominfo: boolean){
    this.post.title = this.titleFormControl.value;
    this.post.categoryId = +this.category;
    this.post.description = JSON.stringify(this.quill.getContents());
    this.isLoading.edit = true;
    this.pService.updatePost(this.post)
    .finally(() => { this.isLoading.edit = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe((updated) => {
      if (updated){
        if (isKominfo){
          this.navigator.navigate([`/post/${this.post.id}`]);
        } else {
          this.navigator.navigate(['/']);
        }
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
