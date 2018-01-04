import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Post, Reply } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-jawaban-page',
  templateUrl: './edit-jawaban-page.component.html',
  styleUrls: ['./edit-jawaban-page.component.scss']
})
export class EditJawabanPageComponent implements OnInit {
  
  jawabanFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  post: Post;
  reply: Reply;

  constructor(private pService: PostService, private navigator: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];
    this.post = this.pService.getPostById(postId);
    this.reply = this.pService.getReplyByPostId(postId);
    this.jawabanFormControl.setValue(this.reply.body);
  }

  onEditJawaban(){
  }
}
