import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-tambah-post-page',
  templateUrl: './tambah-post-page.component.html',
  styleUrls: ['./tambah-post-page.component.scss']
})
export class TambahPostPageComponent implements OnInit {
  
  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  separatorKeysCodes = [ENTER, COMMA];
  keywords: string[] = [];

  constructor() { }
  
  ngOnInit() {
  }


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.keywords.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(item: string): void {
    let index = this.keywords.indexOf(item);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  onTambahPost(){
    
  }

}
