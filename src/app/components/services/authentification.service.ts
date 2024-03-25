import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  SignIn(params: SignIn):Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email,
      params.password
    ));
  }
}

type SignIn = { email: string, password: string }