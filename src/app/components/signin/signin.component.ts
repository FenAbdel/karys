import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
    
  form!:FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;
  constructor(
    private authentificationService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  login(){
    this.isLoggingIn = true;
    from(this.authentificationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    })).subscribe(() => {
      this.router.navigate(['/home']);
    }, (error: any) => {
      this.isLoggingIn = false;
      this.snackBar.open('Username ou Mot de passe Invalid', 'Ok',{
        duration: 5000
      })
    });

  
  }

  recoverPassword(){
    this.isRecoveringPassword = true;
    from(this.authentificationService.recoverPassword(this.form.value.email)).subscribe(() => {
      this.isRecoveringPassword = false;
      this.snackBar.open('Un email a été envoyé', 'Ok',{
        duration: 5000
      })
    }, (error: any) => {
      this.isRecoveringPassword = false;
      this.snackBar.open(error.message, 'Ok',{
        duration: 5000
      })

    }
    
    
    );
  }


}
