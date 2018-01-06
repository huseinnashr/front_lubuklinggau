import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/index';
import { MatDialog } from '@angular/material';
import { Dinas } from '../../models/index';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-manage-dinas',
  templateUrl: './manage-dinas.component.html',
  styleUrls: ['./manage-dinas.component.scss']
})
export class ManageDinasComponent implements OnInit {

  isEditing: boolean;
  dinasId: number;
  dinas: Dinas[];

  formControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);  

  constructor(
    private cService: CategoryService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cService.getDinas().subscribe(
      (dinas) => {
        this.dinas = dinas;
      }, (e) => { console.log(e); },
    );
  }

  onAddDinas(name){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Dinas yang telah ditambahkan tidak bisa dihapus! Yakin ingin menambahkan?`, action: 'Yakin' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.cService.addDinas(name).subscribe(
          (result) => {
            this.formControl.reset();
            this.dinas.push(result);
          }, (e) => { console.log(e); },
        );
      };
    });

  }

  onEditDinas(id, name){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan mengubah dinas ${id} menjadi ${name}!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.cService.updateDinas(id, name).subscribe(
          (result) => {
            this.formControl.reset();
            let index = this.cService.findIndex(id, this.dinas);
            this.dinas[index].name = name; 
          }, (e) => { console.log(e); },
        );
      };
    });
  }

  onCloseEditMode(){
    this.isEditing = false;
    this.formControl.reset();
  }
  
  editModeOn(el, id, name){
    el.scrollIntoView( {behavior:"smooth"} );
    this.formControl.setValue(name);
    this.dinasId = id;
    this.isEditing = true;
  }
}
