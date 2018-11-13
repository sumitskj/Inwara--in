import { Component, OnInit } from '@angular/core';
import { TechcrunchService } from '../services/techcrunch.service';
import { News } from './news';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title1: string;
  url1: string;
  image1: string;
  source1: string;
  desc1: string;

  title2: string;
  url2: string;
  image2: string;
  source2: string;
  desc2: string;

  title3: string;
  url3: string;
  image3: string;
  source3: string;
  desc3: string;

  title4: string;
  url4: string;
  image4: string;
  source4: string;
  desc4: string;
  new: News;
  constructor(private tech: TechcrunchService) { }

  ngOnInit() {
    this.tech.getNews().subscribe(news => {
      if (news.status === 'ok') {

          this.title1 = news.articles[0].title;
          this.url1 = news.articles[0].url;
          this.source1 = news.articles[0].source.name;
          this.image1 = news.articles[0].urlToImage;
          this.desc1 = news.articles[0].description;

          this.title2 = news.articles[1].title;
          this.url2 = news.articles[1].url;
          this.source2 = news.articles[1].source.name;
          this.image2 = news.articles[1].urlToImage;
          this.desc2 = news.articles[1].description;


          this.title3 = news.articles[2].title;
          this.url3 = news.articles[2].url;
          this.source3 = news.articles[2].source.name;
          this.image3 = news.articles[2].urlToImage;
          this.desc3 = news.articles[2].description;


          this.title4 = news.articles[3].title;
          this.url4 = news.articles[3].url;
          this.source4 = news.articles[3].source.name;
          this.image4 = news.articles[3].urlToImage;
          this.desc4 = news.articles[3].description;

      } else {
        console.log('Not loaded');
        return false;
      }
    });
  }


}
