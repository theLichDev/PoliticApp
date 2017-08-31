import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    private navParams: NavParams
  ) {  }

  ngOnInit() {
    this.governmentEntity = this.navParams.data;
  }

}
