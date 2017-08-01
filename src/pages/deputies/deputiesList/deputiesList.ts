import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { DeputiesSearchModal } from '../deputiesSearch/deputiesSearch'

import { Deputy } from '../../../shared/models/deputy';

@Component({
  selector: 'deputies-list',
  templateUrl: 'deputiesList.html'
})
export class DeputiesListPage implements OnInit {

  public deputies: Deputy[];
  public filteredDeputies: Deputy[];
  public filtersArray: Array<{ name: string, value: any }> = [];
  public showFilters: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public database: AngularFireDatabase,
    public modalCtrl: ModalController
  ) {  }

  ngOnInit() {
    let loadingDeputies = this.loadingCtrl.create({
      content: 'Cargando datos...'
    });
    loadingDeputies.present();
    this.database.list('/deputies')
      .subscribe((data: Deputy[]) => {
        this.deputies = data;
        this.filteredDeputies = data;
        loadingDeputies.dismiss();
      });
  }

  deleteFilter(filterName: string) {

  }

  deputyTapped() {
    //TODO implement details view
    console.log('Mariano Clicked');
  }

  openAdvancedSearch() {
    let searchModal = this.modalCtrl.create(DeputiesSearchModal);
    searchModal.onDidDismiss((filters: any) => {
      if (filters) {
        // Convert the modal filters result to iterable array
        this.filtersArray = Object.keys(filters).map((filterName) => {
          return { name: filterName, value: filters[filterName] };
        });
        // Create filter loader
        let filterDataLoading = this.loadingCtrl.create({
          content: 'Filtrando Resultados...'
        });
        filterDataLoading.present();
        // Filter logic
        this.filterDeputies(this.filtersArray);
        // Dismiss filter loader
        filterDataLoading.dismiss();
      }
    });
    searchModal.present();
  }

  private filterDeputies(filters: Array<{ name: string, value: any }>) {
    let passFilter;
    this.filteredDeputies = this.deputies.filter((deputy: Deputy) => {
      passFilter = true;
      filters.forEach((filter) => {
        switch(filter.name) {
          case 'freeText':
            let text = deputy.name.toLowerCase() + ' ' + deputy.lastName.toLowerCase()+ ' ' + deputy.description.toLowerCase();
            passFilter = passFilter && text.includes(filter.value.toLowerCase());
        }
      });
      return passFilter;
    });
  }

}
