import { Component, OnInit, Inject } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../models/index';
import { AdminService } from '../../../services/index';

@Component({
  selector: 'app-userlist-dialog',
  templateUrl: './userlist-dialog.component.html',
  styleUrls: ['./userlist-dialog.component.scss']
})
export class UserlistDialogComponent implements OnInit {

  private ngUnsubscribe: Subject<any> = new Subject();
  public users: User[];
  public isLoadingInfo: boolean = false;
  
  constructor(
    private admService: AdminService, 
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(){
    if (this.data.ids.length > 0){
      this.isLoadingInfo = true;
      this.admService.getUsersInfo(this.data.ids)
      .finally(() => { this.isLoadingInfo = false; })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (users) => {
          this.users = users;
        }, (e) => { console.log(e); },
      );
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
