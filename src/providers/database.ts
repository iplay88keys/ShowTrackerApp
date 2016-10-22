import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserData } from './user-data';

import { Settings } from '../models/settings';

@Injectable()
export class Database {
  headers: any;
  settings: Settings;

  constructor(
    public user: UserData,
    public http: Http
  ) { }

  getData(endpoint) {
    let promise = new Promise((resolve, reject) => {
      this.user.getSettings().then((set:Settings) => {
        if (set != null) {
          this.settings = set;
        } else {
          this.settings = new Settings("", "");
        }

        let finalUrl = this.settings.url + endpoint;
        this.headers = new Headers({'Authorization': "Token " + this.settings.token});
        return this.http.get(finalUrl, {headers: this.headers}).subscribe(
          data => {
            resolve(data.json());
          },
          err => {
            reject(err);
          }
        );
      });
    });

    return Observable.fromPromise(promise);
  }

  postData(endpoint, body) {
    let promise = new Promise((resolve, reject) => {
      this.user.getSettings().then((set:Settings) => {
        if (set != null) {
          this.settings = set;
        } else {
          this.settings = new Settings("", "");
        }

        let finalUrl = this.settings.url + endpoint;
        this.headers = new Headers({'Authorization': "Token " + this.settings.token});

        return this.http.post(finalUrl, body, {headers: this.headers}).subscribe(
          data => {
            resolve(data.json());
          },
          err => {
            reject(err);
          }
        );
      });
    });

    return Observable.fromPromise(promise);
  }

  deleteData(endpoint) {
    let promise = new Promise((resolve, reject) => {
      this.user.getSettings().then((set:Settings) => {
        if (set != null) {
          this.settings = set;
        } else {
          this.settings = new Settings("", "");
        }

        let finalUrl = this.settings.url + endpoint;
        this.headers = new Headers({'Authorization': "Token " + this.settings.token});

        this.http.delete(finalUrl, {headers: this.headers}).subscribe(
          data => {
            resolve(data.json());
          },
          err => {
            reject(err);
          }
        );
      });
    });

    return Observable.fromPromise(promise);
  }
}
