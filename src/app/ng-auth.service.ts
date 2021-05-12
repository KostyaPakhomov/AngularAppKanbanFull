import { Injectable, NgZone } from '@angular/core';
import auth from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
  userState: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user') as string);
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user') as string);
      }
    });
  }

  // tslint:disable-next-line:typedef
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['board']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // tslint:disable-next-line:typedef
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // tslint:disable-next-line:typedef
  SendVerificationMail() {
    // @ts-ignore
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      });
  }

  // tslint:disable-next-line:typedef
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // tslint:disable-next-line:typedef
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // tslint:disable-next-line:typedef
  AuthLogin(provider: auth.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['board']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userState, {
      merge: true
    });
  }

  // tslint:disable-next-line:typedef
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
