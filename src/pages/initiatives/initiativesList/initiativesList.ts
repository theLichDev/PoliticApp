import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { InitiativesSearchModal } from '../initiativesSearch/initiativesSearch';
// import { DeputiesDetailsPage } from '../deputiesDetails/deputiesDetails';

import { Initiative } from '../../../shared/models/initiative';

@Component({
  selector: 'initiatives-list',
  templateUrl: 'initiativesList.html'
})
export class InitiativesListPage implements OnInit {

  public dictionary: Object = {
    freeText: 'Contiene',
    dateFrom: 'Desde',
    dateTo: 'Hasta',
    parliamentaryGroup: 'Grupo',
    type: 'Tipo',
    state: 'Estado',
    processingResult: 'Resultado' 
  };

  public initiatives: Initiative[];
  public filteredInitiatives: Initiative[];
  public filtersArray: Array<{ name: string, value: any }> = [];
  public showFilters: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public database: AngularFireDatabase,
    public modalCtrl: ModalController
  ) {  }

  ngOnInit() {
    let loadingInitiatives = this.loadingCtrl.create({
      content: 'Cargando Iniciativas...'
    });
    loadingInitiatives.present();
    this.database.list('/initiatives')
      .subscribe((data: Initiative[]) => {
        this.initiatives = data;
        this.filteredInitiatives = data;
        loadingInitiatives.dismiss();
      });
  }

  deleteFilter(filterName: string) {
    let filterDataLoading = this.loadingCtrl.create({
      content: 'Filtrando Iniciativas...'
    });
    filterDataLoading.present();
    this.filtersArray = this.filtersArray.filter((filter) => {
      return filter.name != filterName;
    });
    this.filterInitiatives(this.filtersArray);
    filterDataLoading.dismiss();
  }

  deleteAllFilters() {
    let filterDataLoading = this.loadingCtrl.create({
      content: 'Cargando Iniciativas...'
    });
    filterDataLoading.present();
    this.filtersArray = [];
    this.filteredInitiatives = this.initiatives.filter(() => {
      return true;
    });
    filterDataLoading.dismiss();
  }

  initiativeTapped(initiative: Initiative) {
    console.log(initiative);
  }

  openAdvancedSearch() {
    let searchModal = this.modalCtrl.create(InitiativesSearchModal);
    searchModal.onDidDismiss((filters: any) => {
      if (filters) {
        // Convert the modal filters result to iterable array
        this.filtersArray = Object.keys(filters).map((filterName) => {
          return { name: filterName, value: filters[filterName] };
        });
        // Create filter loader
        let filterDataLoading = this.loadingCtrl.create({
          content: 'Filtrando Iniciativas...'
        });
        filterDataLoading.present();
        // Filter logic
        this.filterInitiatives(this.filtersArray);
        // Dismiss filter loader
        filterDataLoading.dismiss();
      }
    });
    searchModal.present();
  }

  private filterInitiatives(filters: Array<{ name: string, value: any }>) {
    let passFilter;
    this.filteredInitiatives = this.initiatives.filter((initiative: Initiative) => {
      passFilter = true;
      filters.forEach((filter) => {
        switch(filter.name) {
          case 'freeText':
            let text = initiative.description.toLowerCase();
            passFilter = passFilter && text.includes(filter.value.toLowerCase());
            break;
          case 'parliamentaryGroup':
            passFilter = passFilter && initiative.parliamentaryGroup === filter.value;
            break;
          case 'type':
            passFilter = passFilter && initiative.type === filter.value;
            break;
          case 'state':
            passFilter = passFilter && initiative.state === filter.value;
            break;
          case 'processingResult':
            passFilter = passFilter && initiative.processingResult === filter.value;
            break;
          case 'dateFrom':
            let initiativeDateFrom = new Date(initiative.presentationDate);
            let filterDateFrom = new Date(filter.value - 7200000);
            if (initiativeDateFrom >= filterDateFrom) {
              passFilter = passFilter && true;
            } else {
              passFilter = passFilter && false;
            }
            break;
          case 'dateTo':
            let initiativeDateTo = new Date(initiative.presentationDate);
            let filterDateTo = new Date(filter.value - 7200000);
            if (initiativeDateTo <= filterDateTo) {
              passFilter = passFilter && true;
            } else {
              passFilter = passFilter && false;
            }
            break;
        }
      });
      return passFilter;
    });
  }

}