import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Quill } from 'quill';

@Component({
  selector: 'app-tambah-jawaban-page',
  templateUrl: './tambah-jawaban-page.component.html',
  styleUrls: ['./tambah-jawaban-page.component.scss']
})
export class TambahJawabanPageComponent implements OnInit, OnDestroy {

  post: Post;
  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading = { post: true, add: false }
  quill: Quill;

  constructor(private pService: PostService, private navigator: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];    
    this.pService.getPostById(postId)
    .finally(() => { this.isLoading.post = false; })
    .takeUntil(this.ngUnsubscribe)
    .subscribe((post) => {
      if (!post){
        this.navigator.navigate(['/404']);
      }
      this.post = post;
    });
  }

  onTextEditorCreated($event: Quill){
    this.quill = $event;
  }

  onTambahJawaban(){
    this.isLoading.add = true;
    this.pService.addReply(
      JSON.stringify(this.quill.getContents()), this.post)
      .finally(() => { this.isLoading.add = false; })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      (res) => {
        if (res) {
          this.navigator.navigate([`/post/${this.post.id}`]);
        }
      },
      (err) => {
        console.log('Gagal membuat jawaban');
      }
    );
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
