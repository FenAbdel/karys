import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordsMatchValidation(): ValidatorFn{
  return(control: AbstractControl): ValidationErrors | null=>{
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password && confirmPassword && password !==   confirmPassword) {
        return{
          passwordsDontMatch: true
        }
      }
      
      return null;
  };
}
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },{ validators:  passwordsMatchValidation() });

  constructor(private authService: AuthentificationService, private toast: HotToastService,  private router: Router){ }
  ngOnInit(): void{}

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  submit(){
    if (!this.signUpForm.valid) return;

    const {name, email, password }= this.signUpForm.value;

    // Vérifier si name est null ou indéfini
  if (!name) {
    // Afficher un message d'erreur approprié à l'utilisateur
    console.error('Name is null or undefined. Please provide a valid name.');
    return;
  } 
  if (!email) {
    // Afficher un message d'erreur approprié à l'utilisateur
    console.error('Email is null or undefined. Please provide a valid email.');
    return;
  }
  // Vérifier si password est null ou indéfini
  if (!password) {
    // Afficher un message d'erreur approprié à l'utilisateur
    console.error('Password is null or undefined. Please provide a valid password.');
    return;
  }
    this.authService.signUp(name, email,password ).pipe(
      this.toast.observe({
        success: 'Congrat! You are all signed up',
        loading: 'Signing up',
        error: ({ message }) => message ? `${message}` : 'An error occurred'
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}
