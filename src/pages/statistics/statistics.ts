import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'statistics-page',
  templateUrl: 'statistics.html'
})
export class StatisticsPage implements OnInit{

  @ViewChild('pieCanvas') pieCanvas;
  public pieChart: any;

  @ViewChild('barCanvas') barCanvas;
  public barChart: any;

  @ViewChild('lineCanvas') lineCanvas;
  public lineChart: any;

  constructor() {  }

  ngOnInit() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          data: [ 134, 83, 67, 32, 9, 5, 19 ],
          backgroundColor: [
            '#02A1E2',
            'red',
            '#5C2F5D',
            '#EC6B27',
            '#FCB131',
            '#079048',
            'grey'
          ]
        }],
        labels: [
          'Popular',
          'Socialista',
          'Unidos Podemos',
          'Ciudadanos',
          'Esquerra Republicana',
          'Vasco',
          'Mixto'
        ]
      }
    });
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            label: 'General',
            data: [ 3.9, 4.1, 4.4, 2.9 ],
            backgroundColor: [
              '#02A1E2',
              'red',
              '#EC6B27',
              '#5C2F5D'
            ]
          },
          {
            label: 'Votantes',
            data: [ 6.9, 5.7, 6.5, 5.2 ],
            backgroundColor: [
              '#97DFFD',
              '#F99393',
              '#FDB996',
              '#B583B6'
            ]
          }
        ],
        labels: [
          'Mariano Rajoy',
          'Pedro Sanchez',
          'Albert Ribera',
          'Pablo Iglesias'
        ]
      }
    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Mariano Rajoy',
            fill: false,
            data: [ 33, 34.8, 37.8, 35.7, 34.2, 33.2, 31.2, 30.2, 25.9, 25.5, 26.9 ],
            borderColor: [
              '#02A1E2'
            ]
          },
          {
            label: 'Pedro Snachez',
            fill: false,
            data: [ 22.7, 21.3, 18, 17.9, 17.9, 19.1, 19, 20.7, 22.8, 21.6, 22 ],
            borderColor: [
              'red'
            ]
          },
          {
            label: 'Albert Rivera',
            fill: false,
            data: [ 13.1, 12, 11.6, 13, 14.5, 15.5, 16.5, 17.4, 18.7, 18.8, 18.5 ],
            borderColor: [
              '#EC6B27'
            ]
          },
          {
            label: 'Pablo Iglesias',
            fill: false,
            data: [ 21.1, 21.1, 22.1, 23.1, 22.9, 21.7, 21.5, 20.7, 19.2, 20.6, 19.7 ],
            borderColor: [
              '#5C2F5D'
            ]
          }
        ],
        labels: [
          'Julio 2016',
          'Septiembre 2016',
          'Octubre 2016',
          'Noviembre 2016',
          'Diciembre 2016',
          'Enero 2017',
          'Marzo 2017',
          'Abril 2017',
          'Junio 2017',
          'Julio 2017',
          'Agosto 2017'
        ]
      }
    });
  }

}
