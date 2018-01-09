import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CategoryService, PostService } from '../../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Dinas } from '../../../models/index';
import { Subject } from 'rxjs';
import { Post } from '../../../models/Post';

@Component({
  selector: 'app-disposisi-dialog',
  templateUrl: './disposisi-dialog.component.html',
  styleUrls: ['./disposisi-dialog.component.scss']
})
export class DisposisiDialogComponent implements OnInit, OnDestroy{

  dinasList: Dinas[];
  

  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading = { dinas: true, disposisi: false };

  constructor(
    public cService: CategoryService,
    public dialogRef: MatDialogRef<DisposisiDialogComponent>,
    public pService: PostService,
    @Inject(MAT_DIALOG_DATA) public post: Post,
  ) { 
  }

  ngOnInit(){
    this.cService.getDinas()
    .takeUntil(this.ngUnsubscribe)
    .finally(() => { this.isLoading.dinas = false; })
    .subscribe(
      (dinas) => {
        this.dinasList = dinas;
      }, (e) => { this.dialogRef.close() },
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  disposisi(dinasId){
    this.isLoading.disposisi = true;
    this.post.dinasId = +dinasId;
    this.pService.disposisi(this.post)
    .finally(() => { this.isLoading.disposisi = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe((data) => {
      if (data) {
        this.post.dinasId = data.dinasId;
        this.post.dinas = data.dinas;
        this.dialogRef.close();
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
