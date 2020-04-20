import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  title = 'covid-patient-tracker';

  public user: User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
        console.log('user', user);
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
