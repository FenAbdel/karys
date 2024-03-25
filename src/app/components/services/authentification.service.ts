import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Observable, catchError, from, of, throwError } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {

  private auth: Auth = inject(Auth);
  constructor()
   { }

  signIn(params: SignIn) {
    return signInWithEmailAndPassword(this.auth, params.email, params.password)

  }

  recoverPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email) 
  }

}

type SignIn = { email: string, password: string }