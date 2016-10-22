import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

import { Database } from '../../providers/database';

@Component({
  selector: 'page-season',
  templateUrl: 'season.html'
})
export class SeasonPage {
  data: any;
  length: number;
  seriesID: any;
  seasonID: any;
  result: any;

  constructor(
	public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public db: Database
  ) {
      this.seriesID = navParams.data[0];
      this.seasonID = navParams.data[1];
    }

  ionViewWillEnter() {
    this.updateSeason();
  };

  updateSeason() {
    this.db.getData('/series/' + this.seriesID + '/season/' + this.seasonID).subscribe(
      data => {
        this.data = this.parse(data);
        this.length = Object.keys(data).length;
      },
      err => {
        console.log(err);
      }
    );
  }

  parse(data) {
    let result = {}

    result["episodes"] = data.episodes;
    result["info"] = data.info;
    result["extras"] = data.extras;
    result["watches"] = data.watches;
    result["checked"] = {};

    for (let episode of result["episodes"]) {
      result["checked"][episode.id] = false;
    }

    for (let watch of result["watches"]) {
      result["checked"][watch] = true;
    }
    return result
  }

  changeWatched(id) {
    this.data["checked"][id] = !this.data["checked"][id]
    if (this.data["checked"][id]) {
      let body = JSON.stringify({ "season_id": this.seasonID });
      this.db.postData('/series/' + this.seriesID + '/season/' + this.seasonID + '/episode/' + id, body).subscribe(
        data => {
          this.data = this.parse(data);
          this.length = Object.keys(data).length;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.db.deleteData('/series/' + this.seriesID + '/season/' + this.seasonID + '/episode/' + id).subscribe(
        data => {
          this.data = this.parse(data);
          this.length = Object.keys(data).length;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  goToEpisode(seriesID, seasonID, episodeID) {
	//this.navCtrl.push(SeriesPage, seriesID);
  }
}
