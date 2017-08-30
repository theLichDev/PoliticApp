import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { Initiative } from '../../../shared/models/initiative';

@Component({
  selector: 'initiatives-details',
  templateUrl: 'initiativesDetails.html'
})
export class InitiativesDetailsPage implements OnInit{

  @ViewChild('pieCanvas') pieCanvas;

  public initiative: Initiative;

  public pieChart: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
  ) {  }

  ngOnInit() {
    this.initiative = this.navParams.data;

    // recover initiative comments 

    if (this.initiative.votingResult) {
      this.pieChart = new Chart(this.pieCanvas.nativeElement, {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              this.initiative.votingResult.agree,
              this.initiative.votingResult.disagree,
              this.initiative.votingResult.abstentions,
              this.initiative.votingResult.noVote
            ],
            backgroundColor: [
              '#00cc66',
              '#ff5050',
              '#bfbfbf',
              '#333333'
            ]
          }],
          labels: [
            'A favor',
            'En contra',
            'Abstenciones',
            'No vota'
          ]
        }
      });
    }
  }

}
