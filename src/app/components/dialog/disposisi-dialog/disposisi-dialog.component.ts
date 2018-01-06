import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Dinas } from '../../../models/index';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-disposisi-dialog',
  templateUrl: './disposisi-dialog.component.html',
  styleUrls: ['./disposisi-dialog.component.scss']
})
export class DisposisiDialogComponent implements OnInit, OnDestroy{

  dinasList: Dinas[];

  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    public cService: CategoryService,
    public dialogRef: MatDialogRef<DisposisiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
  }

  ngOnInit(){
    this.cService.getDinas()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (dinas) => {
        this.dinasList = dinas;
      }, (e) => { console.log(e); },
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
