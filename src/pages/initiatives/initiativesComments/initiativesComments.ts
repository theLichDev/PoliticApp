import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { AppComment } from '../../../shared/models/appComment';

@Component({
  selector: 'initiatives-comments',
  templateUrl: 'initiativesComments.html'
})
export class InitiativesCommentsPage implements OnInit{

  public initiativeId: number;
  public comments: AppComment[];
  public commentText: string;

  constructor(
    private navParams: NavParams,
    private database: AngularFireDatabase
  ) {  }

  ngOnInit() {
    this.initiativeId = this.navParams.data;
    this.database.list('/comments')
      .subscribe((data: AppComment[]) => {
        this.comments = data.filter((comment) => {
          return comment.initiativeId === this.initiativeId;
        });
      });
  }

  sendComment() {
    this.database.list('/comments').push({
      initiativeId: this.initiativeId,
      text: this.commentText,
      date: new Date().getTime(),
      allowDelete: true
    });
    this.commentText = '';
  }

  deleteComment(key: any) {
    this.database.list('/comments').remove(key);
  }

}