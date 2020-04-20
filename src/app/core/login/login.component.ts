import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;
  public showRecoverPass = false;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public recoverPassForm = this.fb.group({
    email: ['', Validators.required]
  });

  ngOnInit(): void {}

  public doLogin() {
    this.auth.doLogin(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
  }

  public showRecoverPassForm() {
    this.showRecoverPass = !this.showRecoverPass;
  }

  public recoverPass() {
    this.auth.recoverPassword(this.recoverPassForm.get('email').value);
  }
}
