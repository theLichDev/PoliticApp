import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { DeputiesSearchModal } from '../deputiesSearch/deputiesSearch'

import { Deputy } from '../../../shared/models/deputy';

@Component({
  selector: 'deputies-list',
  templateUrl: 'deputiesList.html'
})
export class DeputiesListPage implements OnInit {

  deputies: Deputy[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public database: AngularFireDatabase,
    public modalCtrl: ModalController
  ) {  }

  ngOnInit() {
    let loadingDeputies = this.loadingCtrl.create({
      content: 'Cargando datos...'
    });
    loadingDeputies.present();
    this.database.list('/deputies')
      .subscribe((data: Deputy[]) => {
        this.deputies = data;
        loadingDeputies.dismiss();
      });
  }

  itemTapped() {
    console.log('Mariano Clicked');
  }

  openAdvancedSearch() {
    let searchModal = this.modalCtrl.create(DeputiesSearchModal);
    searchModal.onDidDismiss((data: any) => {
      if (data) {
        // Create filter loader
        let filterDataLoading = this.loadingCtrl.create({
          content: 'Filtrando Resultados...'
        });
        filterDataLoading.present();
        // Filter logic
        console.log(data);
        // Dismiss filter loader
        filterDataLoading.dismiss();
      }
    });
    searchModal.present();
  }

}
