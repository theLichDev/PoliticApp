import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';

import { Initiative } from '../../../shared/models/initiative';
import { AppComment } from '../../../shared/models/appComment';

@Component({
  selector: 'initiatives-details',
  templateUrl: 'initiativesDetails.html'
})
export class InitiativesDetailsPage implements OnInit{

  @ViewChild('pieCanvas') pieCanvas;

  public initiative: Initiative;
  public commentsCount: number;
  public pieChart: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.initiative = this.navParams.data;

    this.database.list('/comments')
      .subscribe((data: AppComment[]) => {
        this.commentsCount = data.filter((comment) => {
          return comment.initiativeId === this.initiative.id;
        }).length;
      });
      
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

  handleAgreeOpinion() {
    if (this.initiative.isAgreeVoted) {
      this.initiative.publicOpinion.agree = this.initiative.publicOpinion.agree - 1;
      this.initiative.isAgreeVoted = false;
    } else if (this.initiative.isDisagreeVoted) {
      this.initiative.publicOpinion.disagree = this.initiative.publicOpinion.disagree - 1;
      this.initiative.publicOpinion.agree = this.initiative.publicOpinion.agree + 1;
      this.initiative.isDisagreeVoted = false;
      this.initiative.isAgreeVoted = true;
    } else {
      this.initiative.publicOpinion.agree = this.initiative.publicOpinion.agree + 1;
      this.initiative.isAgreeVoted = true;
    }
    this.database.list('/initiatives').update(this.initiative.$key, this.initiative);
  }

  handleDisagreeOpinion() {
    if (this.initiative.isDisagreeVoted) {
      this.initiative.publicOpinion.disagree = this.initiative.publicOpinion.disagree - 1;
      this.initiative.isDisagreeVoted = false;
    } else if (this.initiative.isAgreeVoted) {
      this.initiative.publicOpinion.agree = this.initiative.publicOpinion.agree - 1;
      this.initiative.publicOpinion.disagree = this.initiative.publicOpinion.disagree + 1;
      this.initiative.isAgreeVoted = false;
      this.initiative.isDisagreeVoted = true;
    } else {
      this.initiative.publicOpinion.disagree = this.initiative.publicOpinion.disagree + 1;
      this.initiative.isDisagreeVoted = true;
    }
    this.database.list('/initiatives').update(this.initiative.$key, this.initiative);
  }

  openComments() {
    console.log('comments opened')
  }

}
