import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-utama-page',
  templateUrl: './utama-page.component.html',
  styleUrls: ['./utama-page.component.scss']
})
export class UtamaPageComponent implements OnInit, OnDestroy {

  public posts: Post[];

  constructor(private pService: PostService) { }
  private ngUnsubscribe: Subject<any> = new Subject();

  ngOnInit() {    
    this.pService.getPosts(null)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (result) => {
        if(result)
          this.posts = result.rows;
      },
    )
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
