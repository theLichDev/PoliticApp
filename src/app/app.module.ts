import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//App Components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//App device initialization
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

//AF2 Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpJy6NY5MVaJC00En8wqmxkRpkBv-ab0I",
  authDomain: "politicapp-138e1.firebaseapp.com",
  databaseURL: "https://politicapp-138e1.firebaseio.com",
  projectId: "politicapp-138e1",
  storageBucket: "politicapp-138e1.appspot.com",
  messagingSenderId: "343074815853"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
