import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'deputies-search',
  templateUrl: 'deputiesSearch.html'
})
export class DeputiesSearchModal implements OnInit{

  public search: any = {};
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
    if (Object.keys(this.search).length > 0) {
      if (this.search.dateFrom) {
        //TODO: Parse date to timestamp
      }
      if (this.search.dateTo) {
        //TODO: Parse date to timestamp
      }
      this.viewCtrl.dismiss(this.search);
    } else {

    }
  }

  handleSelectCancel(nameInput: string) {
    this.search[nameInput] = null;
  }

}
