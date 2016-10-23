import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { Database } from '../../providers/database';

import { Settings } from '../../models/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings: Settings;

  constructor(
    public navCtrl: NavController,
    public db: Database,
    public user: UserData
  ) {
    this.user.getSettings().then(
      settings => {
        if (settings != null) {
          this.settings = new Settings(settings.token, settings.url);
        } else {
					this.settings = new Settings("", "")
        }
      },
      err => {
        this.settings = new Settings("", "");
      }
    );
  }

  onSettingsChanged(form) {
    if (form.valid) {
			this.user.setSettings(this.settings);
      this.navCtrl.pop();
    }
  }
}
