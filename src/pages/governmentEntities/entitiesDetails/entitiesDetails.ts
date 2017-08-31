import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { DeputiesDetailsPage } from '../../deputies/deputiesDetails/deputiesDetails';
import { Deputy } from '../../../shared/models/deputy';

@Component({
  selector: 'entities-details',
  templateUrl: 'entitiesDetails.html'
})
export class EntitiesDetailsPage implements OnInit{

  public governmentEntity: any;
  public deputies: Deputy[];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.governmentEntity = this.navParams.data;
    if (this.governmentEntity.members) {
      this.database.list('/deputies')
      .subscribe((data: Deputy[]) => {
        this.deputies = data.filter((deputy) => {
          return this.governmentEntity.members.indexOf(deputy.id) > -1;
        });
      });
    }
  }

  deputyDetails(deputy: Deputy) {
    this.navCtrl.push( DeputiesDetailsPage, deputy);
  }

}
