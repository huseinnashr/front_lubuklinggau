import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CategoryService, PostService } from '../../services/index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Category } from '../../models/index';

@Component({
  selector: 'app-tambah-post-page',
  templateUrl: './tambah-post-page.component.html',
  styleUrls: ['./tambah-post-page.component.scss']
})
export class TambahPostPageComponent implements OnInit, OnDestroy {
  
  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);
  category: string;
  categories: Category[];
  description: string;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    public cService: CategoryService,
    public pService: PostService,
    private navigator: Router,
  ) { }
  
  ngOnInit() {
    this.cService.getCategories()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (categories) => {
        this.categories = categories;
      }, (e) => { console.log(e); },
    );
  }

  onTambahPost(){
    this.pService.addPost(
      this.titleFormControl.value, this.category, this.description
    )
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (postId) => {
        if (postId > 0){
          this.navigator.navigate([`/post/${postId}`]);
        }
      },
      (err) => {
        console.log('Error tambah post');
      }
    );

  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  canDeactivate(){
    return !(this.titleFormControl.dirty || this.category != null || this.description != null);
  }
}
