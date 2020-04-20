import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthState = null;
  public userSubject: BehaviorSubject<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.afAuth.authState.pipe().subscribe(authState => {
      console.log('firebase authState', authState);
      if (!!authState) {
        this.userAuthState = authState;
        this.router.navigate(['/main']);
      } else {
        this.userAuthState = null;
      }
      this.userSubject.next(this.userAuthState);
    });
  }

  // Returns true if user is logged in
  public authenticated(): boolean {
    return this.userAuthState !== null;
  }

  public doLogin(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(login => {
        this._snackBar.open('Login com sucesso', 'Ok', {
          duration: 50000,
          panelClass: ['snackbar-success']
        });
        console.log('login', login);
        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 500);
      })
      .catch(err => {
        console.error('error on login', err);
        this._snackBar.open(`Problemas no login ${err.message}`, 'Ok', {
          duration: 50000,
          panelClass: ['snackbar-error']
        });
      });
  }

  public doRegister(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(register => {
        console.log('register', register);
        this._snackBar.open('Novo registo com sucesso', 'Ok', {
          duration: 50000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.error('error on register', err);
        this._snackBar.open(`Problemas no registo ${err.message}`, 'Ok', {
          duration: 50000,
          panelClass: ['snackbar-error']
        });
      });
  }

  public recoverPassword(email: string) {
    this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(recover => {
        console.log('recover', recover);
        this._snackBar.open('Nova password enviada', 'Ok', {
          duration: 50000,
          panelClass: ['snackbar-success']
        });
      })
      .catch(err => {
        console.error('error on recover', err);
        this._snackBar.open(
          `Problemas a pedir nova pass ${err.message}`,
          'Ok',
          {
            duration: 50000,
            panelClass: ['snackbar-error']
          }
        );
      });
  }

  public signOut() {
    this.afAuth.auth
      .signOut()
      .then(out => {
        this.userAuthState = null;
        this.userSubject.next(this.userAuthState);
        console.log('signoutOut', out);
        this._snackBar.open('Logout', 'Ok', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });

        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error('error logout out', err);
        this._snackBar.open(`Problemas com o logout ${err.message}`, 'Ok', {
          duration: 50000,
          panelClass: ['snackbar-error']
        });
      });
  }
}
