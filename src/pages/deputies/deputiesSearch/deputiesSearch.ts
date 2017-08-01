import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'deputies-search',
  templateUrl: 'deputiesSearch.html'
})
export class DeputiesSearchModal implements OnInit{

  public search: any = {};
  public parliamentaryGroups: string[];
  public districts: string[];
  public positions: Object[];

  constructor(
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
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
          return item;
        });
      });
  }

  closeSearch() {
    this.viewCtrl.dismiss();
  }

  initSearch() {
    if (Object.keys(this.search).length > 0) {
      if (this.search.dateFrom) {
        this.search.dateFrom = new Date(this.search.dateFrom).getTime();
      }
      if (this.search.dateTo) {
        this.search.dateTo = new Date(this.search.dateTo).getTime();
      }
      this.viewCtrl.dismiss(this.search);
    } else {
      let warningToast = this.toastCtrl.create({
        message: 'Debe completar al menos un campo',
        duration: 2500,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Cerrar'
      });
      warningToast.present();
    }
  }

  handleSelectCancel(nameInput: string) {
    this.search[nameInput] = null;
  }

}
