import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';

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

  separatorKeysCodes = [ENTER, COMMA];
  keywords: string[] = [];
  description;

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private navigator: Router,
    private pService: PostService,
  ) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];
    this.post = this.pService.getPostById(postId);
    this.titleFormControl.setValue(this.post.title);
    this.keywords = this.post.keywords;
    this.description = this.post.body;
  }


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(item: string): void {
    let index = this.keywords.indexOf(item);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  onEditPost(){
    
  }

}
