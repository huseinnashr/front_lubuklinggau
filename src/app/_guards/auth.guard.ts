import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private navigator: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        console.log('Navigate');
        // not logged in so redirect to login page
        this.navigator.navigate(['/masuk']);
        return false;
    }

}