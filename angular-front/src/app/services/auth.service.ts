import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('admins/signup',  user, {headers: header})
      .map(res => res.json());
  }

  login(user) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('admins/login', user, {headers: header})
      .map(res => res.json());
  }

  storeData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    this.loadToken();

    if (this.authToken == undefined) {
      return false;
    } else {
      return true;
    }
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getProfile() {
    let header = new Headers();
    this.loadToken();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.authToken);

    return this.http.get('admins/profile', {headers: header})
      .map(res => res.json());
  }
}

