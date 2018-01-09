import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Post, Reply } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-jawaban-page',
  templateUrl: './edit-jawaban-page.component.html',
  styleUrls: ['./edit-jawaban-page.component.scss']
})

export class EditJawabanPageComponent implements OnInit, OnDestroy {
  
  jawabanFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  post: Post;
  reply: Reply;

  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading = { reply: true,  edit: false }

  constructor(private pService: PostService, private navigator: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];
    this.pService.getPostById(postId)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((post) => {
      if (!post){
        this.navigator.navigate(['/404']);
      }
      this.post = post;
    });
    this.pService.getReplyByPostId(postId)
    .finally(() => { this.isLoading.reply = false; })
    .takeUntil(this.ngUnsubscribe)
    .subscribe((reply) => {
      if (reply){
        this.reply = reply;
        this.jawabanFormControl.setValue(this.reply.body);
      } else {
        this.navigator.navigate([`/post/${postId}`]);
      }
    });
  }

  onEditJawaban(){
    this.isLoading.edit = true;
    this.reply.body = this.jawabanFormControl.value;
    this.pService.updateReply(this.reply, this.post)
    .finally(() => { this.isLoading.edit = false } )
    .takeUntil(this.ngUnsubscribe)
    .subscribe((reply) => {
      if (reply){
        this.navigator.navigate([`/post/${this.post.id}`]);
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
