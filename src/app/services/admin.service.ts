import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor() { }
  
  addAdmin(data: {email: string, category: number}){
    
  }

  getAdmins(){
    let admin = {
      email: "eliza@domain.com",
      category: "Pariwisata",
    }

    let admins = [];

    for (let i = 0; i < 8; i++){
      admins.push(admin);
    }

    return admins;
  }

  getKominfoAdmins(){
    let admin = {
      email: "eliza@domain.com",
      category: "Kominfo",
    }

    let admins = [];

    for (let i = 0; i < 3; i++){
      admins.push(admin);
    }

    return admins;
  }

  editAdmin(email: string, category: string){
    
  }

  deleteAdmin(email: string){
    
  }
}
