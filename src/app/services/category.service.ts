import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {
  
  private categories = [
    {id: 1, name: "Umum"},
    {id: 2, name: "Pariwisata"},
    {id: 3, name: "Pekerjaan Umum"}
  ]

  constructor() { }

  getCategories(){
    return this.categories;
  }

  findCategoryId(name: string): number {
    let category = this.categories.find(c => { return c.name.toLowerCase() === name });
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
}
