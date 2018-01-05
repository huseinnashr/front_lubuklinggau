import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';

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
    Validators.minLength(5),
  ]);

  nama: string;
  email: string;
  nik: string;
  password: string;

  constructor(
    private aService: AuthService, 
    private navigator: Router
  ) {}

  onDaftar(){
    this.aService.register(
      this.namaFormControl.value, 
      this.emailFormControl.value,
      this.nikFormControl.value, 
      this.passwordFormControl.value
    ).subscribe(result => {
        if (result === true) {
            this.navigator.navigate(['/']);
        };
    });
  }

}
