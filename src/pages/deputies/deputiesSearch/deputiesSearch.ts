import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'deputies-search',
  templateUrl: 'deputiesSearch.html'
})
export class DeputiesSearchModal implements OnInit {

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {  }

  ngOnInit() {
    
  }

  closeSearch() {
    this.viewCtrl.dismiss();
  }

  initSearch() {
    this.viewCtrl.dismiss();
  }

}
