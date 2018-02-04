import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Post } from '../../models/Post';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import 'rxjs/add/operator/filter';
import { Category } from '../../models/index';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  filteredPosts: Post[] = [];
  resultlength: number = 0;
  req: string;
  query: PostQuery = new PostQuery();
  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading: boolean = true;
  public isFollowedPost: boolean; // For BACKEND Query WHERE BUG.

  constructor(
    private route: ActivatedRoute, 
    public navigator: Router, 
    private pService: PostService, 
    private cService: CategoryService,
    private aService: AuthService) {
    }

  ngOnInit() {
    this.loadParams();      
  }

  loadParams(){
    let paramQuery = this.route.snapshot.queryParamMap;
    if (!paramQuery.get('req'))
      this.navigator.navigate(['/404']);
    else this.req = paramQuery.get('req');
    this.query.page = paramQuery.get('page') ? +paramQuery.get('page') : 0;
    this.query.size = paramQuery.get('size') ? +paramQuery.get('size') : 10;
    this.search();
  }

  search(){
    let query = {};

    if (this.req == "Belum Dijawab") {
      if (this.aService.getCurrentUser() == null) {
        this.navigator.navigate(['/404']);
      } else {
        query = { req: 'terbaru', isAnswered: false, dinasId: this.aService.getCurrentUser().dinas.id, offset: this.query.page * this.query.size };
      }
    } 
    
    else if (this.req == "Post Saya") {
      if (this.aService.getCurrentUser() == null) {
        this.navigator.navigate(['/404']);
      } else {
        query = { req: 'terbaru', authorId: this.aService.getCurrentUser().id, self: true, offset: this.query.page * this.query.size };
      }
    } 
    
    else if (this.req == "Post Yang Diikuti") {
      this.isFollowedPost = true;
      if (this.aService.getCurrentUser() == null) {
        this.navigator.navigate(['/404']);
      } else {
        query = { req: 'terbaru', authorId: this.aService.getCurrentUser().id, followed: true, offset: this.query.page * this.query.size };
      }
    } 

    else if (this.req == "terbaru"){
      query = { 
        req: this.req, size: this.query.size, offset: this.query.page * this.query.size
      };
    }

    else if (this.req == "Belum Disetujui") {
      if (this.aService.getCurrentUser() == null) {
        this.navigator.navigate(['/404']);
      } else {
        query = { req: 'terbaru', approved: false, offset: this.query.page * this.query.size };
      }
    } 
    
    this.pService.getPosts(query)
    .finally(() => { this.isLoading = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (result) => {
        if(result) {
          this.resultlength = result.count;
          this.filteredPosts = result.rows;
        }
      },
      (err) => {}
    )
  }

  pageEvent(event: PageEvent){
    this.query.page = event.pageIndex;
    this.query.size = event.pageSize;
    this.navigator.navigate([`/post`], {queryParams: this.query});
    this.search();
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

class PostQuery {
  page: number = 0;
  size: number = 10;
}