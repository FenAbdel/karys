import { Injectable } from '@angular/core';
import{ Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth'
import { switchMap, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private auth: Auth) { }

  signUp(name: string, email: string, password: string){
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
      ).pipe(switchMap(({user}) => updateProfile(user, { displayName:name})))

  }
}
