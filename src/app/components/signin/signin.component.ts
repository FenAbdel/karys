import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  
  form!:FormGroup;
  isLoggingIn = false;

  constructor(
    private AuthentificationService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  login(){
    this.isLoggingIn = true;
    this.AuthentificationService.SignIn({
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe(()=> {
        this.router.navigate(['home']);
      },(error: any) => {

        this.isLoggingIn = false;
      });
  }

}
