import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CONFIG } from '../_config/index';
import { MatSnackBar } from '@angular/material';
import { Reply } from '../models/Post';
import { Post } from '../models/index';
import { CurrentUser } from '../models/User';

@Injectable()
export class AuthService {
  public token: string;
  private currentUser: CurrentUser;
  public authChange: Subject<null> = new Subject<null>();

  constructor(private http: Http, private snackBar: MatSnackBar) {
      // set token if saved in local storage
      let local = JSON.parse(localStorage.getItem('currentUser'));
      if (local){
        this.token = local && local.token;
        this.currentUser = local.user;
      }
  }

  login(email: string, password: string): Observable<boolean> {
      return this.http.post(`${CONFIG.API_ADDRESS}/api/authenticate`, { email, password })
          .map((response: Response): boolean => {
            let res = response.json();
            let token = res && res.token;
              if (token) {
                  this.saveCurrentUser(email, res, token);
                  this.snackBar.open('Berhasil Masuk', null, { duration: 3000 });
                  this.authChange.next();
                  return true;
              } else {
                this.snackBar.open('Token tidak ditemukan', null, { duration: 3000 });
                return false;
              }
          })
          .catch((error, caught): Observable<boolean> => {
            this.snackBar.open(error.json().message || 'Gagal masuk, Kesalahan Server', null, { duration: 3000 });
            return Observable.of(false);
          });
  }

  register(name: string, email: string, nik: string, password: string): Observable<boolean> {
      return this.http.post(`${CONFIG.API_ADDRESS}/api/register`, { name, email, nik, password })
          .map((response: Response) => {
              let res = response.json();
              let token = res && res.token;
              if (token) {
                  this.saveCurrentUser(email, res, token);
                  this.snackBar.open('Berhasil mendaftar', null, { duration: 3000 });
                  this.authChange.next();
                  return true;
              } else {
                  this.snackBar.open(response.json().message, null, { duration: 3000 });
                  return false;
              }
          })
          .catch((error, caught): Observable<boolean> => {
            this.snackBar.open(error.json().message || 'Gagal mendaftar, Kesalahan Server', null, { duration: 3000 });
            return Observable.of(false);
          }); 
  }

  logout(next): void {
      this.removeCurrentUser();
      this.snackBar.open('Berhasil Keluar', null, { duration: 3000 });
      this.authChange.next();
      next();
  }

  saveCurrentUser(email, res, token ){
    this.token = token;
    console.log(res);
    this.currentUser = { id: res.id, name: res.name, email, usertype: res.usertype, dinas: res.dinas };
    localStorage.setItem('currentUser', JSON.stringify({ 
      user: this.currentUser, token 
    }));
  }

  removeCurrentUser(){
    this.token = null;
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  getCurrentUser(){
    return this.currentUser; 
  }

  getHeader(){
    const headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
    const options = new RequestOptions({headers: headers});
    options.headers.set('x-access-token', this.token);
    return options;
  }

  hasPostAccess(post: Post){
    if (!this.currentUser) return false;
    
    // Yang membuat Post
    if (post.author.id == this.currentUser.id) return true;
    
    if (!this.currentUser.dinas) {
      // Super User
      if(this.currentUser.usertype == 1)
        return true;

      // Regular User
      else return false;
    }     
    // Kominfo atau admin dinas post
    else if (this.currentUser.dinas.id == 1 || this.currentUser.dinas.name == post.dinas) return true;
    return false;
  }

}