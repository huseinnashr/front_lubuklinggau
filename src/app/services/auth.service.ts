import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable, Subject } from 'rxjs';
import { Http, Response, Headers } from '@angular/Http';
import { CONFIG } from '../_config/index';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  public token: string;
  public authChange: Subject<null> = new Subject<null>();

  constructor(private http: Http, private snackBar: MatSnackBar) {
      // set token if saved in local storage
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<boolean> {
      return this.http.post(`${CONFIG.API_ADDRESS}/api/authenticate`, { email, password })
          .map((response: Response) => {
              let token = response.json() && response.json().token;
              if (token) {
                  this.token = token;
                  localStorage.setItem('currentUser', JSON.stringify({ 
                    name: response.json().name, email, usertype: response.json().usertype, token 
                  }));
                  this.snackBar.open('Berhasil Masuk', null, { duration: 3000 });
                  this.authChange.next();
                  return true;
              } else {
                this.snackBar.open('Token tidak ditemukan', null, { duration: 3000 });
                return false;
              }
          })
          .catch((error: any) => Observable.throw(this.snackBar.open(error.json().error, null, { duration: 3000 })));
  }

  register(nama: string, email: string, nik: string, password: string): Observable<boolean> {
      return this.http.post(`${CONFIG.API_ADDRESS}/api/register`, { nama, email, nik, password })
          .map((response: Response) => {
              let token = response.json() && response.json().token;
              if (token) {
                  this.token = token;
                  localStorage.setItem('currentUser', JSON.stringify({ 
                    name: response.json().name, email, usertype: response.json().usertype, token 
                  }));
                  this.snackBar.open('Berhasil mendaftar', null, { duration: 3000 });
                  this.authChange.next();
                  return true;
              } else {
                  this.snackBar.open(response.json().error, null, { duration: 3000 });
                  return false;
              }
          })
          .catch((error: any) => Observable.throw(this.snackBar.open(error.json().error, null, { duration: 3000 })));
  }

  logout(next): void {
      this.token = null;
      localStorage.removeItem('currentUser');
      this.snackBar.open('Berhasil Keluar', null, { duration: 3000 });
      this.authChange.next();
      next();
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}