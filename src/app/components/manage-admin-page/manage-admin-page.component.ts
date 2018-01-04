import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { UserService, CategoryService, AuthService } from '../../services';
import { USER_TYPE } from '../../models/index';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-admin-page',
  templateUrl: './manage-admin-page.component.html',
  styleUrls: ['./manage-admin-page.component.scss']
})
export class ManageAdminPageComponent implements OnInit {

  categories: object[];
  category: string = "2";
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
    public adService: AdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isSuperUser = this.aService.getCurrentUser().type == USER_TYPE.SUPERUSER;
    this.categories = this.cService.getCategories().slice(this.isSuperUser? 0: 1, );
    this.admins = this.adService.getAdmins();
  }

  onAddAdmin(email, category){
    this.adService.addAdmin({
      email: email, category: +category });
    this.category = "2";
    this.emailFormControl.reset();
  }

  onEditAdmin(email: string, category: string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan mengubah ${email} menjadi admin ${this.cService.findCategoryName(+category)}!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.adService.editAdmin(email, category);
        this.onCloseEditMode();
      };
    });
  }

  onCloseEditMode(){
    this.isEditing = false;
    this.emailFormControl.enable();
    this.emailFormControl.reset();
    this.category = "";
  }
  
  editModeOn(el, email: string, category: string){
    el.scrollIntoView( {behavior:"smooth"} );
    this.emailFormControl.setValue(email);
    this.emailFormControl.disable({onlySelf: true});
    this.category = this.cService.findCategoryId(category).toString();
    this.isEditing = true;
  }


  onDeleteAdmin(email: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan mecabut hak admin ${email}!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.adService.deleteAdmin(email);
    });
  }
}