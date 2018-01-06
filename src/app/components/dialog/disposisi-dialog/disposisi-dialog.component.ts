import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-disposisi-dialog',
  templateUrl: './disposisi-dialog.component.html',
  styleUrls: ['./disposisi-dialog.component.scss']
})
export class DisposisiDialogComponent {

  constructor(
    public cService: CategoryService,
    public dialogRef: MatDialogRef<DisposisiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
