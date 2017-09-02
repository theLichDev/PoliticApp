import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'statistics-page',
  templateUrl: 'statistics.html'
})
export class StatisticsPage implements OnInit{

  @ViewChild('pieCanvas') pieCanvas;
  public pieChart: any;

  constructor() {  }

  ngOnInit() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Resultado de la Votación',
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
  }

}
