import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

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
    Validators.minLength(6),
  ]);

  email: string;
  password: string;

}
