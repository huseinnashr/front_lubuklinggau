import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-daftar-page',
  templateUrl: './daftar-page.component.html',
  styleUrls: ['./daftar-page.component.scss']
})
export class DaftarPageComponent implements OnDestroy{
  namaFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(17),
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

  private ngUnsubscribe: Subject<any> = new Subject();
  public isLoading: boolean;

  constructor(
    private aService: AuthService, 
    private navigator: Router
  ) {}

  onDaftar(){
    this.isLoading = true;
    this.aService.register(
      this.namaFormControl.value, 
      this.emailFormControl.value,
      this.nikFormControl.value, 
      this.passwordFormControl.value
    )
    .finally(() => { this.isLoading = false })
    .takeUntil(this.ngUnsubscribe)
    .subscribe(result => {
        if (result === true) {
            this.navigator.navigate(['/']);
        };
    });
  }
  
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
