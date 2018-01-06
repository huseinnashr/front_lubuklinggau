import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { UserService, CategoryService, AuthService } from '../../services';
import { USER_TYPE, Dinas } from '../../models/index';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-admin-page',
  templateUrl: './manage-admin-page.component.html',
  styleUrls: ['./manage-admin-page.component.scss']
})
export class ManageAdminPageComponent implements OnInit {

  dinaslist: Dinas[];
  dinas: string = "2";
  admins: object[];
  isEditing: boolean = false;
  isSuperUser: boolean = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);  
  
  constructor(
    private cService: CategoryService,
    public aService: AuthService,
    public admService: AdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isSuperUser = this.aService.getCurrentUser().usertype == USER_TYPE.SUPERUSER;
    this.dinas = this.isSuperUser ? "1" : "2";
    this.cService.getDinas().subscribe(
      (dinas) => {
        this.dinaslist = dinas.slice(this.isSuperUser? 0: 1);
      }, (e) => { console.log(e); },
    );
    this.admService.getAdmins().subscribe(
      (admins) => {
        this.admins = admins;
      }, (e) => { console.log(e); },
    );
  }

  onAddAdmin(email, dinasId){
    this.admService.addAdmin(email, dinasId).subscribe(
      (success) => {
        this.dinas = this.isSuperUser ? "1" : "2";
        this.emailFormControl.reset();
        this.admService.getAdmins().subscribe(
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

    dialogRef.afterClosed().subscribe(result => {
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.admService.deleteAdmin(email, dinasId).subscribe(
          (success) => {
            this.admService.getAdmins().subscribe(
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
}