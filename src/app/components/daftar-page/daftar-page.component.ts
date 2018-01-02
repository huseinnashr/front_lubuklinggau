import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-daftar-page',
  templateUrl: './daftar-page.component.html',
  styleUrls: ['./daftar-page.component.scss']
})
export class DaftarPageComponent {
  namaFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);  

  nikFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]{16}"),
  ]);  
  
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  nama: string;
  email: string;
  nik: string;
  password: string;

}
