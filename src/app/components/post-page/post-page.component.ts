import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Post } from '../../models/Post';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import 'rxjs/add/operator/filter';
import { Category } from '../../models/index';

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
  private categories: Category[];

  constructor(
    private route: ActivatedRoute, 
    public navigator: Router, 
    private pService: PostService, 
    private cService: CategoryService) {
    }

  ngOnInit() {
    this.cService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }, (e) => { console.log(e); },
    );
    this.loadParams();      
  }

  loadParams(){
    this.category = this.route.snapshot.queryParamMap.get('category');
    if (this.cService.findIdByName(this.category, this.categories) == null)
      this.navigator.navigate(['/404']);
    let paramQuery = this.route.snapshot.queryParamMap;
    this.query.page = paramQuery.get('page') ? +paramQuery.get('page') : 0;
    this.query.size = paramQuery.get('size') ? +paramQuery.get('size') : 10;
    this.search();
  }

  search(){
    let query = { 
      category: this.cService.findIdByName(this.category, this.categories), 
      page: this.query.page, 
      size: this.query.size 
    };
    this.pService.getPosts(this.query).subscribe(
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
    this.navigator.navigate([`/post/${this.category}`], {queryParams: this.query});
    this.search();
  }
}

class PostQuery {
  page: number = 0;
  size: number = 10;
}