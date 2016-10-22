import { Component } from '@angular/core';

import { NavController, PopoverController, ViewController } from 'ionic-angular';

import { SeriesPage } from '../series/series';
import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';

import { Database } from '../../providers/database';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="open('settings')">Settings</button>
      <button ion-item (click)="open('about')">About</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) { }

  open(pageName) {
    switch (pageName) {
      case 'settings':
        this.navCtrl.push(SettingsPage).then(() => {
          this.viewCtrl.dismiss();
        });
        break;
      case 'about':
        this.navCtrl.push(AboutPage).then(() => {
          this.viewCtrl.dismiss();
        });
        break;
    }
  }
}


@Component({
  selector: 'page-watchlist',
  templateUrl: 'watchlist.html'
})
export class WatchlistPage {
  data: JSON;
  length: number;
  segment: string;
  missingSettings: boolean;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public db: Database
  ) {
    this.segment = 'all';
  }

  ionViewWillEnter() {
    this.updateWatchlist();
  }

  updateWatchlist() {
    this.db.getData('/watchlist').subscribe(
      (data:JSON) => {
        this.data = data;
        this.length = Object.keys(data).length;
        this.missingSettings = false;
      },
      err => {
        this.missingSettings = true;
        this.length = 0;
        console.log(err);
      }
    );
  }

  goToSeries(seriesID) {
		this.navCtrl.push(SeriesPage, seriesID);
  }

  settingsPage() {
		this.navCtrl.push(SettingsPage);
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
