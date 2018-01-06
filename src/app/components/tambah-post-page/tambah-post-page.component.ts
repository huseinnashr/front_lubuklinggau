import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CategoryService, PostService } from '../../services/index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  description: string;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    public cService: CategoryService,
    public pService: PostService,
    private navigator: Router,
  ) { }
  
  ngOnInit() {
  }

  onTambahPost(){
    this.pService.addPost(
      this.titleFormControl.value, this.category, this.description
    )
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (postId) => {
        if (postId != -1){
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
}
