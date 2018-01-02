import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatChipInputEvent, DateAdapter, PageEvent } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms/src/validators';

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
  query: SearchQuery = new SearchQuery;

  constructor(public route: ActivatedRoute, private pService: PostService, public cService: CategoryService, private adapter: DateAdapter<any>) { 
    let paramQuery = route.snapshot.queryParamMap;

  }

  dateFromC(event: MatDatepickerInputEvent<Date>){
    this.query.dateFrom = `${event.value}`;
  }
  dateUntilC(event: MatDatepickerInputEvent<Date>){
    this.query.dateUntil = `${event.value}`;
  }

  ngOnInit(){
    this.loadQuery();
  }

  loadQuery(){
    let paramQuery = this.route.snapshot.queryParamMap;
    this.query.category = paramQuery.get('category');
    this.query.keywords = paramQuery.getAll('keywords');
    this.query.onlyAnswered = paramQuery.get('onlyAnswered') == "true";
    this.query.isDateFiltered = paramQuery.get('isDateFiltered') == "true";

    let dateFrom = paramQuery.get('dateFrom') == null ? new Date() : new Date(+paramQuery.get('dateFrom'));
    let dateUntil = paramQuery.get('dateUntil') == null ? new Date() : new Date(+paramQuery.get('dateUntil'));
    this.dateFrom = new FormControl(dateFrom);
    this.dateUntil = new FormControl(dateUntil);

    if (this.query.isDateFiltered){
      this.query.dateFrom = `${this.dateFrom.value.getTime()}`;
      this.query.dateUntil = `${this.dateUntil.value.getTime()}`;
    }

    if (paramQuery.get('isSearching') == "true")
      this.onSearch();
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.query.keywords.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(item: any): void {
    let index = this.query.keywords.indexOf(item);

    if (index >= 0) {
      this.query.keywords.splice(index, 1);
    }
  }

  onSearch() {
    this.filteredPosts = this.pService.getPostsPreview();
  }

  onDateFilterChange(){
    if (!this.query.isDateFiltered){
      this.query.dateFrom = null;
      this.query.dateUntil = null;
    } else {
      this.query.dateFrom = `${this.dateFrom.value.getTime()}`;
      this.query.dateUntil = `${this.dateUntil.value.getTime()}`;
    }
  }

  getFilteredPosts(event: PageEvent){
    if (event == null)  return this.filteredPosts.slice(0, 10);
    return this.filteredPosts.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }
}

class SearchQuery {
  isSearching: boolean = true;
  category: string;
  keywords: string[];
  onlyAnswered: boolean;
  isDateFiltered: boolean;
  dateFrom: string;
  dateUntil: string;
  location?: {
    lat: number,
    lng: number
  }
}
