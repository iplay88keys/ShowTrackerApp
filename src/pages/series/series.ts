import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SeasonPage } from '../season/season';

import { Database } from '../../providers/database';

@Component({
  selector: 'page-series',
  templateUrl: 'series.html'
})
export class SeriesPage {
  public data: JSON;
  public length: number;
  seriesID: any;

  constructor(
	public navCtrl: NavController,
    public navParams: NavParams,
    public db: Database
  ) {
      this.seriesID = navParams.data;
  }

  ionViewWillEnter() {
    this.updateSeries();
  };

  updateSeries() {
    this.db.getData('/series/' + this.seriesID).subscribe(
      (data:JSON) => {
        this.data = data;
        this.length = Object.keys(data).length;
      },
      err => {
        console.log(err);
      }
    );
  }

  goToSeason(seriesID, seasonID) {
    let params = [seriesID, seasonID]
	this.navCtrl.push(SeasonPage, params);
  }
}
