import { Injectable } from '@angular/core';
import { Post, Reply } from '../models/Post';
import { Http, Response, Headers, RequestOptions } from '@angular/Http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../_config/index';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Admin } from '../models/index';

@Injectable()
export class AdminService {

  constructor(
    public http: Http, 
    private snackBar: MatSnackBar,
    private aService: AuthService,
  ) { }



  getAdmins(): Observable<Admin[]> {
    return this.http.get(`${CONFIG.API_ADDRESS}/user/admins`, this.aService.getHeader())
    .map((response: Response): Admin[] => {
      let admins = response.json().admins;
      if (admins) {
        admins.map((admin) => {
          admin.dinas = admin.dinas.name;
          return admin;
        });
        return admins;
      } else {
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return null;
      }
    })
    .catch((error, caught): Observable<Admin[]> => {
      this.snackBar.open('Kesalahan dalam mendapatkan admin', null, { duration: 3000 });
      return Observable.of(null);
    });
  }

  addAdmin(email, dinasId): Observable<boolean> {
    return this.http.post(`${CONFIG.API_ADDRESS}/user/admins`, { email, dinasId }, this.aService.getHeader())
    .map((response: Response): boolean => {
      let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.count > 0;
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Kesalahan dalam aksi kelola admin', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  deleteAdmin(email, dinasId){
    return this.http.post(`${CONFIG.API_ADDRESS}/user/admins/cabut`, { email, dinasId }, this.aService.getHeader())
    .map((response: Response): boolean => {
      let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.count > 0;
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Kesalahan dalam aksi kelola admin', null, { duration: 3000 });
      return Observable.of(false);
    });
  }
}
