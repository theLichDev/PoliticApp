import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { EntitiesDetailsPage } from '../entitiesDetails/entitiesDetails';

@Component({
  selector: 'dashboard-entities',
  templateUrl: 'dashboardEntities.html'
})
export class DashboardEntitiesPage implements OnInit{

  public governmentEntities: any[];

  constructor(
    public navCtrl: NavController,
    private database: AngularFireDatabase,
    public loadingCtrl: LoadingController,
  ) {  }

  ngOnInit() {
    let loadingGovernmentEntities = this.loadingCtrl.create({
      content: 'Cargando Órganos...'
    });
    loadingGovernmentEntities.present();
    this.database.list('/governmentEntities')
      .subscribe((data: any[]) => {
        this.governmentEntities = data;
        loadingGovernmentEntities.dismiss();
      });
  }

  openGovernmentEntity(entity: any) {
    this.navCtrl.push(EntitiesDetailsPage, entity);
  }

}