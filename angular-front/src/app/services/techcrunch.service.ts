import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TechcrunchService {
   key = '0dc58ffe66d144549747fa860f5ed3b5';

  constructor (private http: Http) { }

  getNews() {
  const url = 'https://newsapi.org/v2/everything?' +
  'q=Blockchain&' +
  'from=2018-11-11&' +
  'sortBy=popularity&' +
  'apiKey=' + this.key;

  return this.http.get(url)
    .map(res => res.json());
  }
}
