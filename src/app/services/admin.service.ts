import { Injectable } from '@angular/core';
import { Post, Reply } from '../models/Post';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../_config/index';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Admin } from '../models/index';
import { User } from '../models/index'

@Injectable()
export class AdminService {

  constructor(
    public http: Http, 
    private snackBar: MatSnackBar,
    private aService: AuthService,
  ) { }

  getAdmins(): Observable<Admin[]> {
    return this.http.get(`${CONFIG.API_ADDRESS}/admin`, this.aService.getHeader())
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
      this.snackBar.open(error.json().message || 'Kesalahan dalam mendapatkan admin', null, { duration: 3000 });
      return Observable.of(null);
    });
  }

  addAdmin(email, dinasId): Observable<boolean> {
    return this.http.post(`${CONFIG.API_ADDRESS}/admin`, { email, dinasId }, this.aService.getHeader())
    .map((response: Response): boolean => {
      let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.count > 0;
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open(error.json().message || 'Kesalahan dalam aksi kelola admin', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  deleteAdmin(email, dinasId): Observable<boolean> {
    return this.http.post(`${CONFIG.API_ADDRESS}/admin/cabut`, { email, dinasId }, this.aService.getHeader())
    .map((response: Response): boolean => {
      let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.count > 0;
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open(error.json().message || 'Kesalahan dalam aksi kelola admin', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  getUserInfo(id): Observable<User> {
    return this.http.get(`${CONFIG.API_ADDRESS}/user/${id}`, this.aService.getHeader())
    .map((response: Response): User => {
      let user = response.json().user;
      if (user) {
        return user;
      } else {
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        throw new Error();
      }
    })
    .catch((error, caught): Observable<User> => {
      this.snackBar.open(error.json().message || 'Kesalahan dalam mendapatkan info user', null, { duration: 3000 });
      return Observable.throw(error);
    });
  }
}
