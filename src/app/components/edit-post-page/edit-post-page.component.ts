import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { CategoryService } from '../../services/index';
import { Subject } from 'rxjs';
import { Category } from '../../models/index';

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
  description;
  categories: Category[];

  post: Post;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private navigator: Router,
    private pService: PostService,
    public cService: CategoryService
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
      this.description = this.post.description;
    });
    this.cService.getCategories()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (categories) => {
        this.categories = categories;
      }, (e) => { console.log(e); },
    );
  }

  onEditPost(){
    this.post.title = this.titleFormControl.value;
    this.post.categoryId = +this.category;
    this.post.description = this.description;

    this.pService.updatePost(this.post)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((updated) => {
      if (updated){
        this.navigator.navigate([`/post/${this.post.id}`]);
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
