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

  public dictionary: Object = {
    freeText: 'Contiene',
    dateFrom: 'Desde',
    dateTo: 'Hasta',
    district: 'Circunscripción',
    gender: 'Sexo',
    parliamentaryGroup: 'Grupo',
    position: 'Cargo',
    propertyDeclaration: 'Declaración',
    socialNetworks: 'Redes Sociales',
    male: 'Hombre',
    female: 'Mujer',
    Portavoz: 'Portavoz',
    Vocal: 'Vocal',
    Vicepresident: 'Vicepresidente',
    President: 'Presidente',
    Adscrit: 'Adscrit'
  };

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
      content: 'Cargando Diputados...'
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
    let filterDataLoading = this.loadingCtrl.create({
      content: 'Filtrando Diputados...'
    });
    filterDataLoading.present();
    this.filtersArray = this.filtersArray.filter((filter) => {
      return filter.name != filterName;
    });
    this.filterDeputies(this.filtersArray);
    filterDataLoading.dismiss();
  }

  deleteAllFilters() {
    let filterDataLoading = this.loadingCtrl.create({
      content: 'Cargando Diputados...'
    });
    filterDataLoading.present();
    this.filtersArray = [];
    this.filteredDeputies = this.deputies.filter(() => {
      return true;
    });
    filterDataLoading.dismiss();
  }

  deputyTapped(deputy: Deputy) {
    //TODO implement details view
    console.log(deputy);
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
          content: 'Filtrando Diputados...'
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
            break;
          case 'parliamentaryGroup':
            passFilter = passFilter && deputy.parliamentaryGroup === filter.value;
            break;
          case 'district':
            passFilter = passFilter && deputy.district === filter.value;
            break;
          case 'position':
            let positions = deputy.positions.filter((position: string) => {
              return position.toLowerCase().includes(filter.value.toLowerCase());
            });
            passFilter = passFilter && positions.length > 0;
            break;  
          case 'gender':
            passFilter = passFilter && deputy.gender === filter.value;
            break;
          case 'socialNetworks':
            if (deputy.socialNetworks) {
              passFilter = passFilter && (filter.value === 'true');
            } else {
              passFilter = passFilter && (filter.value === 'false');
            }
            break;
          case 'propertyDeclaration':
            if (deputy.propertyDeclaration) {
              passFilter = passFilter && (filter.value === 'true');
            } else {
              passFilter = passFilter && (filter.value === 'false');
            }
            break;
          case 'dateFrom':
            let deputyDateFrom = new Date(deputy.registerDate);
            let filterDateFrom = new Date(filter.value - 7200000);
            if (deputyDateFrom >= filterDateFrom) {
              passFilter = passFilter && true;
            } else {
              passFilter = passFilter && false;
            }
            break;
          case 'dateTo':
            let deputyDateTo = new Date(deputy.registerDate);
            let filterDateTo = new Date(filter.value - 7200000);
            if (deputyDateTo <= filterDateTo) {
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
