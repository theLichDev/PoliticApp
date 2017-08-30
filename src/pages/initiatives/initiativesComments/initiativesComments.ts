import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

//import { AngularFireDatabase } from 'angularfire2/database';

import { AppComment } from '../../../shared/models/appComment';

@Component({
  selector: 'initiatives-comments',
  templateUrl: 'initiativesComments.html'
})
export class InitiativesCommentsPage implements OnInit{

  public initiativeId: number;
  public comments: AppComment[];

  constructor(
    private navParams: NavParams
    //private database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.initiativeId = this.navParams.data;
  }

}