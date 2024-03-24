import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SingUpComponent } from './components/sing-up/sing-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"karys-86c3d","appId":"1:1014848131457:web:7bb281934bf4ff464cd880","storageBucket":"karys-86c3d.appspot.com","apiKey":"AIzaSyDEjr78Xc3kVfl7YXdAj0ERd2Fc69qypYc","authDomain":"karys-86c3d.firebaseapp.com","messagingSenderId":"1014848131457"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"karys-86c3d","appId":"1:1014848131457:web:1e7541e8a104549c4cd880","storageBucket":"karys-86c3d.appspot.com","apiKey":"AIzaSyDEjr78Xc3kVfl7YXdAj0ERd2Fc69qypYc","authDomain":"karys-86c3d.firebaseapp.com","messagingSenderId":"1014848131457"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
