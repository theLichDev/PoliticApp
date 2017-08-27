import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

// import { DeputiesSearchModal } from '../deputiesSearch/deputiesSearch';
// import { DeputiesDetailsPage } from '../deputiesDetails/deputiesDetails';

import { Initiative } from '../../../shared/models/initiative';

@Component({
  selector: 'initiatives-list',
  templateUrl: 'initiativesList.html'
})
export class InitiativesListPage implements OnInit {

  public initiatives: Initiative[];
  public filteredInitiatives: Initiative[];
  public filtersArray: Array<{ name: string, value: any }> = [];
  public showFilters: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public database: AngularFireDatabase,
    public modalCtrl: ModalController
  ) {  }

  ngOnInit() {
    let loadingInitiatives = this.loadingCtrl.create({
      content: 'Cargando Iniciativas...'
    });
    loadingInitiatives.present();
    this.database.list('/initiatives')
      .subscribe((data: Initiative[]) => {
        this.initiatives = data;
        this.filteredInitiatives = data;
        loadingInitiatives.dismiss();
      });
  }

  initiativeTapped(initiative: Initiative) {
    console.log(initiative);
  }

  openAdvancedSearch() {
    console.log('open filters');
  }

}