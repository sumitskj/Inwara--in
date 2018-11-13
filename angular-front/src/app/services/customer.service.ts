import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: Http) { }

  addCustomer(user) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('users',  user, {headers: header})
      .map(res => res.json());
  }
}
