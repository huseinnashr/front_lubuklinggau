import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { UserService, CategoryService, AuthService } from '../../services';
import { USER_TYPE, Dinas } from '../../models/index';
import { AdminService } from '../../services/admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-admin-page',
  templateUrl: './manage-admin-page.component.html',
  styleUrls: ['./manage-admin-page.component.scss']
})
export class ManageAdminPageComponent implements OnInit, OnDestroy {

  dinaslist: Dinas[];
  dinas: string = "2";
  admins: object[];
  isEditing: boolean = false;
  isSuperUser: boolean = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);  
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private cService: CategoryService,
    public aService: AuthService,
    public admService: AdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isSuperUser = this.aService.getCurrentUser().usertype == USER_TYPE.SUPERUSER;
    this.dinas = this.isSuperUser ? "1" : "2";
    this.cService.getDinas()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (dinas) => {
        this.dinaslist = dinas.slice(this.isSuperUser? 0: 1);
      }, (e) => { console.log(e); },
    );
    this.admService.getAdmins()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (admins) => {
        if(admins.length > 0)
          this.admins = admins;
      }, (e) => { console.log(e); },
    );
  }

  onAddAdmin(email, dinasId){
    this.admService.addAdmin(email, dinasId)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (success) => {
        this.dinas = this.isSuperUser ? "1" : "2";
        this.emailFormControl.reset();
        this.admService.getAdmins()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          (admins) => {
            this.admins = admins;
            this.onCloseEditMode();
          }, (e) => { console.log(e); },
        );
      }, (e) => { console.log(e); }
    );
  }

  onEditAdmin(email, dinasId){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan mengubah ${email} menjadi admin ${this.dinaslist[this.cService.findIndex(dinasId, this.dinaslist)].name}!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
      if (result){
        this.onAddAdmin(email, dinasId);
      };
    });
  }

  onCloseEditMode(){
    this.isEditing = false;
    this.emailFormControl.enable();
  }
  
  editModeOn(el, email: string, dinasId: number){
    el.scrollIntoView( {behavior:"smooth"} );
    this.emailFormControl.setValue(email);
    this.emailFormControl.disable({onlySelf: true});
    this.dinas = dinasId.toString();
    this.isEditing = true;
  }

  onDeleteAdmin(email: string, dinasId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan mecabut hak admin ${email}!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
      if (result) {
        this.admService.deleteAdmin(email, dinasId).subscribe(
          (success) => {
            this.admService.getAdmins()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
              (admins) => {
                this.admins = admins;
                this.onCloseEditMode();
              }, (e) => { console.log(e); },
            );
          }, (e) => { console.log(e); }
        );
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}