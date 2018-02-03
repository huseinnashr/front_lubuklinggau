import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CategoryService, PostService } from '../../services/index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Category } from '../../models/index';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { Quill } from 'quill';

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
  quill: Quill;
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

  onTextEditorCreated($event: Quill){
    this.quill = $event;
  }

  isQuillEmpty(){
    return this.quill.getContents().ops[0].insert == '\n' && this.quill.getLength() < 2;
  }

  onTambahPost(){
    this.pService.addPost(
      this.titleFormControl.value, this.category, JSON.stringify(this.quill.getContents())
    )
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (postId) => {
        if (postId > 0){
          this.titleFormControl.reset();
          this.category = null;
          this.quill.setContents(null);
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
    return !this.titleFormControl.dirty && this.category == null && this.isQuillEmpty();
  }
}
