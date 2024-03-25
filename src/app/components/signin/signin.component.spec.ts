import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { Location } from '@angular/common'; 
import { AuthentificationService } from '../services/authentification.service';

import { Subject } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let page: any;
  let location : Location;
  let AuthentificationService: AuthentificationServiceMock
  beforeEach(async () => {
    AuthentificationService = new AuthentificationServiceMock;
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [
        ReactiveFormsModule,
         RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent }
      ])
      ]
    })
    .overrideProvider(AuthentificationService,{useValue : AuthentificationService})
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninComponent);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;  

    fixture.detectChanges();
  });

  describe('given form', () => {
    it('when email is empty, then recover password button should be disabled', () => {
      SetEmail('');

      expect(recoverPasswordButton().disabled).toBeTruthy();
    });

    it('when email is Invalid, then recover password button should be disabled', () => {
      SetEmail('invalidEmail');

  
      expect(recoverPasswordButton().disabled).toBeTruthy();
    });
  
    it('when email is valid, then recover password button should be enabled', () => {
      SetEmail('valid@email.com');

      expect(recoverPasswordButton().disabled).toBeFalsy();
    });

    it('when email is empty, then login button should be disabled', () => {
      SetEmail('');
      SetPassword('anyPassword');

      expect(loginButton().disabled).toBeTruthy();
    });

    it('when email is invalid, then login button should be disabled', () => {
      SetEmail('invalidEmail');
      SetPassword('anyPassword');

      expect(loginButton().disabled).toBeTruthy();
    });
    it('when password is empty, then login button should be disabled', () => {
      SetEmail('valid@email.com');
      SetPassword('');

  
  
      expect(loginButton().disabled).toBeTruthy();
    });
    it('when password is not empty, then login button should be disabled', () => {
      SetEmail('valid@email.com');
      SetPassword('anyPassword');
     
  
  
      expect(loginButton().disabled).toBeFalsy();
    });

  });

  describe('login flow',() => {
    describe('given user clicks on login button', () => {

      beforeEach(() => {
        SetEmail('valid@email.com');
        SetPassword('anyPassword');
        loginButton().click();
        fixture.detectChanges();
      })
      it('the show login loader', () => {
        expect( loginLoader()).not.toBeNull();
      });
      it('the hide login button', () => {
        expect(loginButton).toBeNull();
      })

      describe('when login is successful', () => {

        beforeEach(()=>{
          AuthentificationService._signInResponse.next({id:"anyUserId"})
        })
        it('should navigate to home page', done => {
          setTimeout(() => {
            expect(location.path()).toEqual('/home');
            done()
          }, 100)
          
        }); 

       
      });
      describe('when login is fails', () => {
        beforeEach(()=>{
          AuthentificationService._signInResponse.error({message:"anyError"});
          fixture.detectChanges();
        })
        it('should not navigate to home page', done => {
          setTimeout(() => {
            expect(location.path()).not.toEqual('/home');
            done()
          }, 100)
          
        }); 

        it('should hide login loader', done => {
          expect(loginLoader).toBeNull();
          
        }); 
      })
    });
   
  })

  function SetEmail(email: string) {
    component.form.get('email')?.setValue(email);
    fixture.detectChanges();
  }

  function SetPassword(value: string) {
    component.form.get('password')?.setValue(value);
    fixture.detectChanges();
  }

  function recoverPasswordButton() {
    return page.querySelector('[test-id="recover-password-button"]')
  }

  function loginButton() {
    return page.querySelector('[test-id="login-button"]')
  }

  function loginLoader() {
    return page.querySelector('[test-id="login-loader"]')
  }
});

class AuthentificationServiceMock {
  _signInResponse = new Subject();
  signIn() {
    return this._signInResponse.asObservable();
  }
}