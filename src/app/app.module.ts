import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//App Components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DeputiesListPage } from '../pages/deputies/deputiesList/deputiesList';
import { DeputiesSearchModal } from '../pages/deputies/deputiesSearch/deputiesSearch';
import { DeputiesDetailsPage } from '../pages/deputies/deputiesDetails/deputiesDetails';
import { InitiativesListPage } from '../pages/initiatives/initiativesList/initiativesList';
import { InitiativesSearchModal } from '../pages/initiatives/initiativesSearch/initiativesSearch';
import { InitiativesDetailsPage } from '../pages/initiatives/initiativesDetails/initiativesDetails';
import { InitiativesCommentsPage } from '../pages/initiatives/initiativesComments/initiativesComments';
import { DashboardEntitiesPage } from '../pages/governmentEntities/dashboardEntities/dashboardEntities';
import { EntitiesDetailsPage } from '../pages/governmentEntities/entitiesDetails/entitiesDetails';
import { DashboardParliamentariGroupsPage } from '../pages/parliamentaryGroups/parliamentaryGroupsDashboard/parliamentaryGroupsDashboard';
import { ParliamentariGroupsDetailsPage } from '../pages/parliamentaryGroups/parliamentaryGroupsDetails/parliamentaryGroupsDetails';
import { StatisticsPage } from '../pages/statistics/statistics';

//Ionic Native
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

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
    DeputiesListPage,
    DeputiesSearchModal,
    DeputiesDetailsPage,
    InitiativesListPage,
    InitiativesSearchModal,
    InitiativesDetailsPage,
    InitiativesCommentsPage,
    DashboardEntitiesPage,
    EntitiesDetailsPage,
    DashboardParliamentariGroupsPage,
    ParliamentariGroupsDetailsPage,
    StatisticsPage
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
    DeputiesListPage,
    DeputiesSearchModal,
    DeputiesDetailsPage,
    InitiativesListPage,
    InitiativesSearchModal,
    InitiativesDetailsPage,
    InitiativesCommentsPage,
    DashboardEntitiesPage,
    EntitiesDetailsPage,
    DashboardParliamentariGroupsPage,
    ParliamentariGroupsDetailsPage,
    StatisticsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
