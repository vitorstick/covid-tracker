import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User, UserDetails } from '../models';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class MainComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  public checked = false;

  public newUserDetailsForm = this.fb.group({
    username: ['', Validators.required],
    gender: ['', Validators.required],
    ageGroup: ['', Validators.required],
    tested: [''],
    locality: ['', Validators.required],
    riskGroup: [''],
    // <!-- Capacidade Respiratória, Dores de Cabeça/Garganta. -->
    temperature: [''],
    cardiac: [''],
    oxigen: [''],
    arterialTension: [''],
    glicemic: [''],
    respiratoryCapacity: [''],
    headthroatpain: ['']
  });

  public user: User;
  public userDetails: UserDetails;
  public noUserDetails = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private _adapter: DateAdapter<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._adapter.setLocale('pt');

    this.authService.userSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
        console.log('user', user);
        this.user = user;
        if (!!this.user && !!this.user.uid) {
          this.getDetails();
        }
      });
  }

  private getDetails() {
    this.userService.getDetails(this.user.uid).subscribe(details => {
      console.log('details', details);
      if (details.length > 0) {
        this.userDetails = details[0];
        this.noUserDetails = false;
        this.userService.userDetailsSubject.next(this.userDetails);
        this.router.navigate(['/temperature']);
      } else {
        this.noUserDetails = true;
      }
    });
  }

  public submitDetails() {
    this.userDetails = {
      uid: this.user.uid,
      email: this.user.email,
      username: this.newUserDetailsForm.get('username').value,
      gender: this.newUserDetailsForm.get('gender').value,
      ageGroup: this.newUserDetailsForm.get('ageGroup').value,
      locality: this.newUserDetailsForm.get('locality').value,
      riskGroup: this.newUserDetailsForm.get('riskGroup').value,
      temperature: this.newUserDetailsForm.get('temperature').value,
      cardiac: this.newUserDetailsForm.get('cardiac').value,
      oxigen: this.newUserDetailsForm.get('oxigen').value,
      arterialTension: this.newUserDetailsForm.get('arterialTension').value,
      glicemic: this.newUserDetailsForm.get('glicemic').value,
      respiratoryCapacity: this.newUserDetailsForm.get('respiratoryCapacity')
        .value,
      headthroatpain: this.newUserDetailsForm.get('headthroatpain').value
    };

    console.log('submitDetails', this.userDetails);

    this.userService.setDetails(this.userDetails).then(details => {
      console.log(details);
    });
  }

  public logStatus() {
    console.log('submitDetails', this.newUserDetailsForm.getRawValue());
    console.log('checked', this.checked);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
