import { Component, OnInit, Inject } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../models/index';
import { AdminService } from '../../../services/index';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss']
})
export class AuthorDialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  public user: User;
  public isLoadingInfo: boolean = true;

  constructor(
    private admService: AdminService, 
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(){
    this.admService.getUserInfo(this.data.id)
    .finally(() => { this.isLoadingInfo = false; })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (user) => {
        this.user = user;
      }, (e) => { console.log(e); },
    );
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
