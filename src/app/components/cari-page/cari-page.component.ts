import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatChipInputEvent, DateAdapter, PageEvent } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService, CategoryService, AuthService } from '../../services/';
import { Category, Dinas, USER_TYPE } from '../../models/index';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cari-page',
  templateUrl: './cari-page.component.html',
  styleUrls: ['./cari-page.component.scss'],
})
export class CariPageComponent implements OnInit, OnDestroy {

  categories: Category[];
  dinasList: Dinas[];
  dateFrom: FormControl
  dateUntil: FormControl
  separatorKeysCodes = [ENTER, COMMA];
  filteredPosts: Post[] = [];
  resultlength: number = 0;
  query: SearchQuery = new SearchQuery;
  public isLoading = { category: true, dinas: true, search: false}
  public isFollowed: boolean;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    public route: ActivatedRoute, 
    private navigator: Router,
    private pService: PostService, 
    public cService: CategoryService, 
    private adapter: DateAdapter<any>,
    private aService: AuthService,
  ) {}

  ngOnInit(){
    this.cService.getCategories()
    .finally(() => { this.isLoading.category = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (categories) => {
        this.categories = categories;
      }, (e) => { console.log(e); },
    );
    this.cService.getDinas()
    .finally(() => { this.isLoading.dinas = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (dinas) => {
        this.dinasList = dinas;
      }, (e) => { console.log(e); },
    );
    this.loadParams();
  }

  loadParams(){
    let paramQuery = this.route.snapshot.queryParamMap;
    this.query.category = paramQuery.get('category');
    this.query.dinasId = paramQuery.get('dinasId');
    this.query.title = paramQuery.get('title');
    this.query.isAnswered = paramQuery.get('isAnswered') == "true" ? true : null;
    this.query.self = paramQuery.get('self') == "true" ? true : null;
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

    if (paramQuery.get('s') == "1"){
      this.getPosts();
    }
  }

  onSearch() {
    this.navigator.navigate(['/cari'], {queryParams: this.query});
    let query = this.processQueryParams(); 
    this.isFollowed = this.query.followed;
    this.getPosts();
  }

  isLoggedIn():boolean{
    return this.aService.getCurrentUser() != null;
  }

  isRegular(){
    if (this.aService.getCurrentUser() == null) return true;
    if (this.aService.getCurrentUser().usertype == USER_TYPE.REGULAR) {
      return true;
    } 
    return false;
  }

  getPosts(){
    this.query.req = "terbaru";
    this.isLoading.search = true;
    this.pService.getPosts(this.tranformQuery(this.query))
    .finally(() => { this.isLoading.search = false; })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (result) => {
        this.resultlength = result.count;
        this.filteredPosts = result.rows;
      }, (e) => { console.log(e) }
    )
  }

  tranformQuery(query: SearchQuery){
    return {
      authorId: query.self || query.followed ? this.isLoggedIn()? this.aService.getCurrentUser().id: null: null,
      self: query.self,
      followed: query.followed,
      categoryId: query.category,
      dinasId: query.dinasId,
      title: query.title,
      isAnswered: query.isAnswered,
      offset: query.page * query.size,
      size: query.size,
      dateFilter: query.datefilter,
      dateFrom: query.datefrom,
      dateUntil: query.dateuntil,
    };
  }

  private processQueryParams(){
    if (!this.query.isAnswered)
      this.query.isAnswered = null;

    if (!this.query.self)
      this.query.self = null;

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

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

class SearchQuery {
  s: string = '1';
  category: string;
  dinasId: string;
  title: string;
  self: boolean;
  followed: boolean;
  isAnswered: boolean;
  datefilter: boolean;
  datefrom: string;
  dateuntil: string;
  page: number = 0;
  size: number = 10;
  req?: string;
}
