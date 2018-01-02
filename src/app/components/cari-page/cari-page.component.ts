import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatChipInputEvent, DateAdapter, PageEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cari-page',
  templateUrl: './cari-page.component.html',
  styleUrls: ['./cari-page.component.scss'],
})
export class CariPageComponent {

  category: string = "1";
  separatorKeysCodes = [ENTER, COMMA];
  keywords: string[] = [];
  filteredPosts: Post[] = [];
  query: SearchQuery = new SearchQuery;

  constructor(public route: Router, private pService: PostService, public cService: CategoryService, private adapter: DateAdapter<any>) { }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.keywords.indexOf(fruit);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  onSearch() {
    window.alert((new Date));
    this.filteredPosts = this.pService.getPostsPreview();
  }

  getFilteredPosts(event: PageEvent){
    if (event == null)  return this.filteredPosts.slice(0, 5);
    return this.filteredPosts.slice(event.pageIndex, event.pageSize);
  }
}

class SearchQuery {
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
