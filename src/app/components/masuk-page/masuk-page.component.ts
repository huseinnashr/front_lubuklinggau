import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-masuk-page',
  templateUrl: './masuk-page.component.html',
  styleUrls: ['./masuk-page.component.scss']
})
export class MasukPageComponent implements OnDestroy {
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);  
  
  passwordFormControl = new FormControl('', [
    Validators.minLength(5),
  ]);
  
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private aService: AuthService,
    private navigator: Router,
  ){}

  onMasuk(){
    this.aService.login(this.emailFormControl.value, this.passwordFormControl.value)
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
