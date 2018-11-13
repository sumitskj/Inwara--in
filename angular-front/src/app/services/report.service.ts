import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: Http) { }

  addReport(report) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('admins/profile',  report, {headers: header})
      .map(res => res.json());
  }

  getReport(key) {
    let param = new URLSearchParams();
    param.append('category', key);
    return this.http.get('reports', {params: param} )
      .map(res => res.json());
  }

}
