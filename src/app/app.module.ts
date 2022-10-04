import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => {
    //   const auth = getAuth();
    //   // if (!environment.production) {
    //   //   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    //   // }
    //   return auth;
    // }),
    // provideFirestore(() => {
    //   const db = getFirestore();
    //   // if ( !environment.production ) {
    //   //   connectFirestoreEmulator( db, 'localhost', 8080 );
    //   // }
    //   return db;
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
