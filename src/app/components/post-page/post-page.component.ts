import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Post } from '../../models/Post';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  filteredPosts: Post[] = [];
  resultlength: number;
  category: string;
  query: PostQuery = new PostQuery();

  constructor(
    private route: ActivatedRoute, 
    public navigator: Router, 
    private pService: PostService, 
    private cService: CategoryService) {
    }

  ngOnInit() {
    this.loadParams();      
  }

  loadParams(){
    this.category = this.route.snapshot.paramMap.get('category');
    if (this.cService.findCategoryId(this.category) == -1)
      this.navigator.navigate(['/404']);
    let paramQuery = this.route.snapshot.queryParamMap;
    this.query.page = paramQuery.get('page') ? +paramQuery.get('page') : 0;
    this.query.size = paramQuery.get('size') ? +paramQuery.get('size') : 10;
    this.search();
  }

  search(){
    let query = { 
      category: this.cService.findCategoryId(this.category), 
      page: this.query.page, 
      size: this.query.size 
    };
    this.resultlength = this.pService.getPostsPreviewLength(query);
    this.filteredPosts = this.pService.getPostsPreview(query);
  }

  pageEvent(event: PageEvent){
    this.query.page = event.pageIndex;
    this.query.size = event.pageSize;
    this.navigator.navigate([`/post/${this.category}`], {queryParams: this.query});
    this.search();
  }
}

class PostQuery {
  page: number = 0;
  size: number = 10;
}