import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Deputy } from '../../../shared/models/deputy';

@Component({
  selector: 'deputies-details',
  templateUrl: 'deputiesDetails.html'
})
export class DeputiesDetailsPage implements OnInit{

  public deputy: Deputy;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {  }

  ngOnInit() {
   this.deputy = this.navParams.data;
  }

  goBack() {
    this.navCtrl.pop();
  }

}
