import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'dashboard-entities',
  templateUrl: 'dashboardEntities.html'
})
export class DashboardEntitiesPage implements OnInit{

  public governmentEntities: any[];

  constructor(
    public navCtrl: NavController,
    private database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.database.list('/governmentEntities')
      .subscribe((data: any[]) => {
        this.governmentEntities = data;
      });
  }

  openGovernmentEntity(entity: any) {
    // this.navCtrl.push(EntitiesDetailsPage, entity);
  }

}