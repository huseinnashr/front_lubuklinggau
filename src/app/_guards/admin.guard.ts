import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { USER_TYPE } from '../models/index';
import { AuthService } from '../services/index';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private navigator: Router, private aService: AuthService) { }

    canActivate() {
        let currentUser = this.aService.getCurrentUser();
        if (currentUser && currentUser.type < USER_TYPE.REGULAR) { 
          // logged in so return true
          return true;
        }

        // not logged in so redirect to login page
        this.navigator.navigate(['/masuk']);
        return false;
    }
}