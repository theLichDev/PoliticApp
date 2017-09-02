import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { DeputiesDetailsPage } from '../../deputies/deputiesDetails/deputiesDetails';
import { Deputy } from '../../../shared/models/deputy';

@Component({
  selector: 'parliamentary-group-details',
  templateUrl: 'parliamentaryGroupsDetails.html'
})
export class ParliamentariGroupsDetailsPage implements OnInit{

  public group: any;
  public deputies: Deputy[];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.group = this.navParams.data;
    if (this.group) {
      this.database.list('/deputies')
      .subscribe((data: Deputy[]) => {
        this.deputies = data.filter((deputy) => {
          return this.group.name === deputy.parliamentaryGroup;
        });
      });
    }
  }

  deputyDetails(deputy: Deputy) {
    this.navCtrl.push( DeputiesDetailsPage, deputy);
  }

}
