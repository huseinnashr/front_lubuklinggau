import { Component, ChangeDetectorRef, OnInit, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './services/index';
import { Subscription } from 'rxjs/Subscription';
import { USER_TYPE, CurrentUser } from './models/index';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  currentUser: CurrentUser;
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
    this.currentUser = aService.getCurrentUser();
    this.authListener = aService.authChange.subscribe(() => { this.currentUser = aService.getCurrentUser(); });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authListener.unsubscribe();
  }

  onLogout(){
    this.aService.logout(() => {
      this.navigator.navigate(['']);
    });
  }

  canManageSite(){
    if (this.currentUser){
      return this.currentUser.usertype == USER_TYPE.SUPERUSER || (this.currentUser.usertype == USER_TYPE.ADMIN && this.currentUser.dinas.id == 1)
    }
    return false;
  }
}

