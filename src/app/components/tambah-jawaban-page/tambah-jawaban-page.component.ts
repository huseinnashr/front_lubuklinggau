import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tambah-jawaban-page',
  templateUrl: './tambah-jawaban-page.component.html',
  styleUrls: ['./tambah-jawaban-page.component.scss']
})
export class TambahJawabanPageComponent implements OnInit, OnDestroy {

  jawabanFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  post: Post;
  private ngUnsubscribe: Subject<any> = new Subject();

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
  }

  onTambahJawaban(){
    this.pService.addReply(
      this.jawabanFormControl.value, this.post)
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
