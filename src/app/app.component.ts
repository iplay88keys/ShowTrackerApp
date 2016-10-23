import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { WatchlistPage } from '../pages/watchlist/watchlist';

import { Database } from '../providers/database';

@Component({
  templateUrl: 'app.template.html'
})
export class TrackerApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = WatchlistPage;

  constructor(
    public db: Database,
    platform: Platform
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
