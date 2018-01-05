import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AlreadyAuthGuard implements CanActivate {

    constructor(private navigator: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
          // logged in so return true
          this.navigator.navigate(['/']);
          return false;
        }
        // not logged in so redirect to login page
        return true;
    }
}