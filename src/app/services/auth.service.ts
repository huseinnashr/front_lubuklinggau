import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map'
import { Http, Response, Headers } from '@angular/Http';
import { AuthData } from '../models/index';

@Injectable()
export class AuthService {
  public token: string;
  public authChange: Subject<AuthData> = new Subject<AuthData>();

  constructor(private http: Http) {
      // set token if saved in local storage
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<boolean> {
      return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let token = response.json() && response.json().token;
              if (token) {
                  // set token property
                  this.token = token;
                  let type: number = response.json().type;
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ 
                    name: response.json().name, email: email, type: type, token: token 
                  }));
                  this.authChange.next({isLoggedIn: true, type});
                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login
                  return false;
              }
          });
  }

  logout(): void {
      this.token = null;
      this.authChange.next({isLoggedIn: false, type: null});
      localStorage.removeItem('currentUser');
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
