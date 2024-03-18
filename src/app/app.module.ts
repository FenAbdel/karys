import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Import des modules Firebase et Angular Fire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Import du module MatIconModule pour les icônes
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule, // Ajout de MatIconModule ici
    // Initialisation de Firebase et Angular Fire
    provideFirebaseApp(() => initializeApp({
      "projectId": "karys-86c3d",
      "appId": "1:1014848131457:web:7bb281934bf4ff464cd880",
      "storageBucket": "karys-86c3d.appspot.com",
      "apiKey": "AIzaSyDEjr78Xc3kVfl7YXdAj0ERd2Fc69qypYc",
      "authDomain": "karys-86c3d.firebaseapp.com",
      "messagingSenderId": "1014848131457"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
