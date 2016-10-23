import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Settings } from '../models/settings';

@Injectable()
export class UserData {
  constructor(
    public storage: Storage
  ) { }

  getSettings() {
    return this.storage.get('settings')
  }

  setSettings(settings: Settings) {
    this.storage.set('settings', settings);
  }
}
