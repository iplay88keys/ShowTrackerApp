import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TrackerApp } from './app.component';

import { WatchlistPage, PopoverPage } from '../pages/watchlist/watchlist';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { SeriesPage } from '../pages/series/series';
import { SeasonPage } from '../pages/season/season';

import { UserData } from '../providers/user-data';
import { Database } from '../providers/database';


@NgModule({
  declarations: [
    TrackerApp,
    WatchlistPage,
    PopoverPage,
    AboutPage,
    SettingsPage,
    SeasonPage,
    SeriesPage
  ],
  imports: [
    IonicModule.forRoot(TrackerApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TrackerApp,
    WatchlistPage,
    PopoverPage,
    AboutPage,
    SettingsPage,
    SeasonPage,
    SeriesPage
  ],
  providers: [UserData, Database, Storage]
})
export class AppModule {}
