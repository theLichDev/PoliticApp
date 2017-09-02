import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DeputiesListPage } from '../pages/deputies/deputiesList/deputiesList';
import { InitiativesListPage } from '../pages/initiatives/initiativesList/initiativesList';
import { DashboardEntitiesPage } from '../pages/governmentEntities/dashboardEntities/dashboardEntities';
import { DashboardParliamentariGroupsPage } from '../pages/parliamentaryGroups/parliamentaryGroupsDashboard/parliamentaryGroupsDashboard';
import { StatisticsPage } from '../pages/statistics/statistics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Diputados', component: DeputiesListPage },
      { title: 'Iniciativas', component: InitiativesListPage },
      { title: 'Órganos de Gobierno', component: DashboardEntitiesPage },
      { title: 'Grupos Parlamentarios', component: DashboardParliamentariGroupsPage },
      { title: 'Estadísticas', component: StatisticsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
