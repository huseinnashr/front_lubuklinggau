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
    this.pService.getPostById(postId).subscribe((post) => {
      if (!post){
        this.navigator.navigate(['/404']);
      }
      this.post = post;
    });
    this.pService.getReplyByPostId(postId).subscribe((reply) => {
      if (reply){
        this.reply = reply;
        this.jawabanFormControl.setValue(this.reply.body);
      } else {
        this.navigator.navigate([`/post/${postId}`]);
      }
    });
  }

  onEditJawaban(){
    this.reply.body = this.jawabanFormControl.value;
    this.pService.updateReply(this.reply, this.post).subscribe((reply) => {
      if (reply){
        this.navigator.navigate([`/post/${this.post.id}`]);
      }
    });
  }
}
