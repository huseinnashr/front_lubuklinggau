import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    constructor(
      public dialog: MatDialog,
    ){}

    canDeactivate(component: CanComponentDeactivate){
      return component.canDeactivate ? component.canDeactivate() ? true: this.showDialog() : true;
    }

    showDialog(){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { description: `Buang perubahan?`, action: 'Ya' },
      });
      return dialogRef.afterClosed().first();
    }

}