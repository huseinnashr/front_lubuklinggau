import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../_config/index';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Category } from '../models/index';
import { Dinas } from '../models/Category';

@Injectable()
export class CategoryService {
  
  private dinas = [
    {id: 1, name: "Umum"},
    {id: 2, name: "Pariwisata"},
    {id: 3, name: "Pekerjaan Umum"}
  ]

  private categories = [
    {id: 1, name: "Sosial"},
    {id: 2, name: "Hukum"},
    {id: 3, name: "Kebijakan"},
  ]

  constructor(
    public http: Http, 
    private snackBar: MatSnackBar,
    private aService: AuthService,
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get(`${CONFIG.API_ADDRESS}/categories/`, this.aService.getHeader())
      .map((response: Response): Category[] => {
        let categories = response.json().categories;
        if (categories) {
          return categories;
        } else {
          this.snackBar.open(response.json().message, null, { duration: 3000 });
          return null;
        }
      })
      .catch((error, caught): Observable<Category[]> => {
        this.snackBar.open('Kesalahan dalam mendapatkan category', null, { duration: 3000 });
        return Observable.of(null);
      });
  }

  addCategory(name): Observable<Category>{
    return this.http.post(`${CONFIG.API_ADDRESS}/categories/`, { name }, this.aService.getHeader())
      .map((response: Response): Category => {
        let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.result;
      })
      .catch((error, caught): Observable<Category> => {
        this.snackBar.open('Kesalahan dalam membuat kategori', null, { duration: 3000 });
        return Observable.of(null);
      });
  }

  updateCategory(id, name): Observable<boolean>{
    return this.http.post(`${CONFIG.API_ADDRESS}/categories/${id}`, { name }, this.aService.getHeader())
      .map((response: Response): boolean => {
        let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.count > 0;
      })
      .catch((error, caught): Observable<boolean> => {
        this.snackBar.open('Kesalahan dalam memperbaharui kategori', null, { duration: 3000 });
        return Observable.throw(error.json().message || 'Kesalahan dalam memperbaharui kategori');
      });
  }

  getDinas(): Observable<Dinas[]> {
    return this.http.get(`${CONFIG.API_ADDRESS}/dinas/`, this.aService.getHeader())
      .map((response: Response): Dinas[] => {
        let dinas = response.json().dinas;
        if (dinas) {
          return dinas;
        } else {
          this.snackBar.open(response.json().message, null, { duration: 3000 });
          throw new Error(response.json().message);
        }
      })
      .catch((error, caught): Observable<Dinas[]> => {
        this.snackBar.open('Kesalahan dalam mendapatkan dinas', null, { duration: 3000 });
        return Observable.throw('Kesalahan dalam mendapatkan dinas');
      });
  }

  addDinas(name): Observable<Dinas>{
    return this.http.post(`${CONFIG.API_ADDRESS}/dinas/`, { name }, this.aService.getHeader())
      .map((response: Response): Dinas => {
        let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.result;
      })
      .catch((error, caught): Observable<Dinas> => {
        this.snackBar.open('Kesalahan dalam membuat dinas', null, { duration: 3000 });
        return Observable.of(null);
      });
  }

  updateDinas(id, name): Observable<boolean>{
    return this.http.post(`${CONFIG.API_ADDRESS}/dinas/${id}`, { name }, this.aService.getHeader())
      .map((response: Response): boolean => {
        let res = response.json();
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return res.count > 0;
      })
      .catch((error, caught): Observable<boolean> => {
        this.snackBar.open('Kesalahan dalam memperbaharui dinas', null, { duration: 3000 });
        return Observable.throw(error.json().message || 'Kesalahan dalam memperbaharui dinas');
      });
  }

  findIdByName(name:string, items){
    var i = 0;
    var len = items.length;
    for (i = 0; i < len; i++) {
      if (name.toUpperCase() === items[i].name.toUpperCase()) {
        return items[i].id;
      }
    }
    return null;
  }

  findNameById(id: number, items){
    var i = 0;
    var len = items.length;
    for (i = 0; i < len; i++) {
      if (id === items[i].id) {
        return items[i].name;
      }
    }
    return null;
  }

  findIndexByName(name:string, items){
    var i = 0;
    var len = items.length;
    for (i = 0; i < len; i++) {
      if (name.toUpperCase() === items[i].name.toUpperCase()) {
        return i;
      }
    }
    return -1;
  }

  findIndex(id: number, items){
    var i = 0;
    var len = items.length;
    for (i = 0; i < len; i++) {
      if (id === items[i].id) {
        return i;
      }
    }
    return -1;
  }
}
