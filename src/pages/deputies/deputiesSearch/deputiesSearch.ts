import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'deputies-search',
  templateUrl: 'deputiesSearch.html'
})
export class DeputiesSearchModal {

  public search: Object = {};

  constructor(
    public viewCtrl: ViewController
  ) {  }

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
