import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { ParliamentariGroupsDetailsPage } from '../parliamentaryGroupsDetails/parliamentaryGroupsDetails';

@Component({
  selector: 'dashboard-parliamentary-groups',
  templateUrl: 'parliamentaryGroupsDashboard.html'
})
export class DashboardParliamentariGroupsPage implements OnInit{

  public parliamentariGroups: any[];

  constructor(
    public navCtrl: NavController,
    private database: AngularFireDatabase,
    public loadingCtrl: LoadingController,
  ) {  }

  ngOnInit() {
    let loadingParliamentariGroups = this.loadingCtrl.create({
      content: 'Cargando Grupos Parlamentarios...'
    });
    loadingParliamentariGroups.present();
    this.database.list('/parliamentaryGroupsEntities')
      .subscribe((data: any[]) => {
        this.parliamentariGroups = data;
        loadingParliamentariGroups.dismiss();
      });
  }

  openParliamentaryGroup(name: string) {
    let item = this.parliamentariGroups.filter((group) => {
      return group.name === name;
    });
    this.navCtrl.push(ParliamentariGroupsDetailsPage, item[0]);
  }

}