import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Initiative } from '../../../shared/models/initiative';

@Component({
  selector: 'initiatives-details',
  templateUrl: 'initiativesDetails.html'
})
export class InitiativesDetailsPage implements OnInit{

  public initiative: Initiative;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {  }

  ngOnInit() {
    this.initiative = this.navParams.data;
  }

  openResult() {
    console.log('Results clicked');
  }

}
