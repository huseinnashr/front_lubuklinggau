import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/index';
import { MatDialog } from '@angular/material';
import { Category } from '../../models/index';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit, OnDestroy {
  isEditing: boolean;
  categoryId: number;
  categories: Category[];

  formControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);  
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private cService: CategoryService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.cService.getCategories()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      (categories) => {
        this.categories = categories;
      }, (e) => { console.log(e); },
    );
  }

  onAddCategory(name){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kategori yang telah ditambahkan tidak bisa dihapus! Yakin ingin menambahkan?`, action: 'Yakin' },
    });

    dialogRef.afterClosed()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
      if (result){
        this.cService.addCategory(name)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          (result) => {
            this.formControl.reset();
            this.categories.push(result);
          }, (e) => { console.log(e); },
        );
      };
    });

  }

  onEditCategory(id, name){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { description: `Kamu akan mengubah kategori ${id} menjadi ${name}!`, action: 'Lanjutkan' },
    });

    dialogRef.afterClosed()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
      if (result){
        this.cService.updateCategory(id, name)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
          (result) => {
            this.onCloseEditMode();
            let index = this.cService.findIndex(id, this.categories);
            this.categories[index].name = name; 
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
    this.categoryId = id;
    this.isEditing = true;
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
