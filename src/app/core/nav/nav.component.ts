import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User, UserDetails } from '../models';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public user: User;
  public userDetail: UserDetails;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.getUserData();
    this.userService.userDetailsSubject.subscribe(uDetail => {
      this.userDetail = uDetail;
    });
  }

  public isUserLoggedIn() {
    // console.log('this.auth.authenticated()', this.auth.authenticated());
    return this.auth.authenticated();
  }

  getUserData() {
    this.auth.userSubject
      .pipe(
        tap(user => {
          this.user = user;
          // console.log('user', this.user);
        })
      )
      .subscribe();
  }

  public doLogin() {}

  public doLogout() {
    this.auth.signOut();
  }
}
