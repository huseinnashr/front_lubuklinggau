import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { CategoryService } from '../../services/index';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrls: ['./edit-post-page.component.scss']
})
export class EditPostPageComponent implements OnInit {

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);
  
  category: string;
  description;

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private navigator: Router,
    private pService: PostService,
    public cService: CategoryService
  ) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];
    this.pService.getPostById(postId).subscribe((post) => {
      if (!post){
        this.navigator.navigate(['/404']);
      }
      this.post = post;    
      this.titleFormControl.setValue(this.post.title);
      this.category = this.post.categoryId.toString();
      this.description = this.post.description;
    });
  }

  onEditPost(){
    this.post.title = this.titleFormControl.value;
    this.post.categoryId = +this.category;
    this.post.description = this.description;

    this.pService.updatePost(this.post).subscribe((updated) => {
      if (updated){
        this.navigator.navigate([`/post/${this.post.id}`]);
      }
    });
  }

}
