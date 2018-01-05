import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masuk-page',
  templateUrl: './masuk-page.component.html',
  styleUrls: ['./masuk-page.component.scss']
})
export class MasukPageComponent {
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);  
  
  passwordFormControl = new FormControl('', [
    Validators.minLength(5),
  ]);

  constructor(
    private aService: AuthService,
    private navigator: Router,
  ){}

  onMasuk(){
    this.aService.login(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(result => {
        if (result === true) {
            this.navigator.navigate(['/']);
        };
    });
  }
}
