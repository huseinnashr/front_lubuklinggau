import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-bantuan-page',
  templateUrl: './bantuan-page.component.html',
  styleUrls: ['./bantuan-page.component.scss']
})
export class BantuanPageComponent implements OnInit {

  constructor(private aService: AuthService) { }

  ngOnInit() {
  }

  isAdmin(){
    return this.aService.getCurrentUser() && this.aService.getCurrentUser().usertype < 3;
  }

}
