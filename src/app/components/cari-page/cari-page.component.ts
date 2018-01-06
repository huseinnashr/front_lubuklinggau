import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent, DateAdapter, PageEvent } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService, CategoryService } from '../../services/';

@Component({
  selector: 'app-cari-page',
  templateUrl: './cari-page.component.html',
  styleUrls: ['./cari-page.component.scss'],
})
export class CariPageComponent implements OnInit {

  dateFrom: FormControl
  dateUntil: FormControl
  separatorKeysCodes = [ENTER, COMMA];
  filteredPosts: Post[] = [];
  resultlength: number = 0;
  query: SearchQuery = new SearchQuery;

  constructor(
    public route: ActivatedRoute, 
    private navigator: Router,
    private pService: PostService, 
    public cService: CategoryService, 
    private adapter: DateAdapter<any>,
  ) {}

  ngOnInit(){
    this.loadParams();
  }

  loadParams(){
    let paramQuery = this.route.snapshot.queryParamMap;
    this.query.category = paramQuery.get('category');
    this.query.dinas = paramQuery.get('dinas');
    this.query.title = paramQuery.get('title');
    this.query.answered = paramQuery.get('answered') == "true" ? true : null;
    this.query.followed = paramQuery.get('followed') == "true" ? true : null;
    this.query.datefilter = paramQuery.get('datefilter') == "true" ? true : null;
    this.query.page = paramQuery.get('page') ? +paramQuery.get('page') : 0;
    this.query.size = paramQuery.get('size') ? +paramQuery.get('size') : 10;

    let dateFrom = paramQuery.get('datefrom') == null ? new Date() : new Date(+paramQuery.get('datefrom'));
    let dateUntil = paramQuery.get('dateuntil') == null ? new Date() : new Date(+paramQuery.get('dateuntil'));
    this.dateFrom = new FormControl(dateFrom);
    this.dateUntil = new FormControl(dateUntil);

    if (this.query.datefilter){
      this.query.datefrom = `${this.dateFrom.value.getTime()}`;
      this.query.dateuntil = `${this.dateUntil.value.getTime()}`;
    }

    if (paramQuery.get('s') == "1")
      this.getPosts();
  }

  onSearch() {
    this.processQueryParams(); 
    this.navigator.navigate(['/cari'], {queryParams: this.query});
    this.getPosts();
  }

  getPosts(){
    this.pService.getPosts(this.query).subscribe(
      (result) => {
        if(result) {
          this.resultlength = result.count;
          this.filteredPosts = result.rows;
        }
      }
    )
  }

  private processQueryParams(){
    if (!this.query.answered)
      this.query.answered = null;

    if (!this.query.followed)
      this.query.followed = null;

    if (!this.query.datefilter){
      this.query.datefilter = null;
      this.query.datefrom = null;
      this.query.dateuntil = null;
    } else {
      this.query.datefrom = `${this.dateFrom.value.getTime()}`;
      this.query.dateuntil = `${this.dateUntil.value.getTime()}`;
    }
  }
  
  pageEvent(event: PageEvent){
    this.query.page = event.pageIndex;
    this.query.size = event.pageSize;    
    this.onSearch();
  }
}

class SearchQuery {
  s: string = '1';
  category: string;
  dinas: string;
  title: string;
  followed: boolean;
  answered: boolean;
  datefilter: boolean;
  datefrom: string;
  dateuntil: string;
  location?: {
    lat: number,
    lng: number
  }
  page: number = 0;
  size: number = 10;
}
