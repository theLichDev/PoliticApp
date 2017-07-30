import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'deputies-search',
  templateUrl: 'deputiesSearch.html'
})
export class DeputiesSearchModal implements OnInit{

  public search: Object = {};
  public parliamentaryGroups: string[];
  public districts: string[];
  public positions: string[];

  constructor(
    public viewCtrl: ViewController,
    public database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.database.list('/parliamentaryGroups')
      .subscribe((data: any[]) => {
        this.parliamentaryGroups = data.map((item) => {
          return item.$value;
        });
      });
    this.database.list('/districts')
      .subscribe((data: any[]) => {
        this.districts = data.map((item) => {
          return item.$value;
        });
      });
    this.database.list('/positions')
      .subscribe((data: any[]) => {
        this.positions = data.map((item) => {
          return item.$value;
        });
      });
  }

  closeSearch() {
    this.viewCtrl.dismiss();
  }

  initSearch() {
    this.viewCtrl.dismiss();
  }

  handleSelectCancel(nameInput: string) {
    this.search[nameInput] = null;
  }

}
