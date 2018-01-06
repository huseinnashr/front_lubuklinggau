import { Injectable } from '@angular/core';

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

  constructor() { }

  getCategories(){
    return this.categories;
  }

  getDinas(){
    return this.dinas;
  }

  findCategoryId(name: string): number {
    let category = this.categories.find(c => { return c.name.toLowerCase() === name.toLowerCase() });
    if (category != null)
      return category.id;
    return -1;
  }

  findCategoryName(id: number): string {
    let category = this.categories.find(c => { return c.id === id });
    if (category != null)
      return category.name;
    return "";
  }

  findDinasName(id: number): string {
    let category = this.dinas.find(c => { return c.id === id });
    if (category != null)
      return category.name;
    return "";
  }
}
