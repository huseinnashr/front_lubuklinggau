import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './services/index';
import { Subscription } from 'rxjs/Subscription';
import { AuthData, USER_TYPE } from './models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  authData: AuthData = new AuthData();
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private authListener: Subscription;

  public REGULAR = USER_TYPE.REGULAR;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private aService: AuthService,
    private navigator: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 760px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authListener = aService.authChange.subscribe((authData) => this.authData = authData);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authListener.unsubscribe();
  }

  onLogout(){
    this.aService.logout();
    this.navigator.navigate(['']);
  }
}

