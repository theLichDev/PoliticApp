import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'deputies-list',
  templateUrl: 'deputiesList.html'
})
export class DeputiesListPage {
  selectedItem: any;
  deputies: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: AngularFireDatabase
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    database.list('/deputies').subscribe((data) => {
      this.deputies = data;
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
    console.log('Mariano Clicked')
  }
}
