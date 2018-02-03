import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-action-progress-dialog',
  templateUrl: './action-progress-dialog.component.html',
  styleUrls: ['./action-progress-dialog.component.scss']
})
export class ActionProgressDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
