import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  
  private category = [
    {id: 1, name: "Umum"},
    {id: 2, name: "Pariwisata"},
    {id: 3, name: "Pekerjaan Umum"}
  ]

  constructor() { }

  getCategories(){
    return this.category;
  }
}
