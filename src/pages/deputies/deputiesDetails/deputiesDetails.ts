import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Deputy } from '../../../shared/models/deputy';

@Component({
  selector: 'deputies-details',
  templateUrl: 'deputiesDetails.html'
})
export class DeputiesDetailsPage implements OnInit{

  public deputy: Deputy;
  public socialNetworks: Array<{ name: string, url: string }>;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private inAppBrowser: InAppBrowser
  ) {  }

  ngOnInit() {
    this.deputy = this.navParams.data;
    if (this.deputy.socialNetworks) {
      this.socialNetworks = Object.keys(this.deputy.socialNetworks).map((socialNetworkName) => {
        return { name: socialNetworkName, url: this.deputy.socialNetworks[socialNetworkName] };
      });
    }
  }

  openInAppWeb(url: string, target: string) {
    this.inAppBrowser.create(url, target);
  }

}
