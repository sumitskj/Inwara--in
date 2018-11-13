import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { ReportService } from '../services/report.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  title: String;
  category: String;
  body: String;
  author: String;

  // tslint:disable-next-line:max-line-length
  constructor(private flashMessage: FlashMessagesService, private reportService: ReportService , private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.loggedIn()) {
      this.user = this.authService.user;
    }
    //console.log(this.user.name);
  }

  onReport() {

    const newReport = {
      title: this.title,
      category: this.category,
      body: this.body,
      author: this.author
    };

    this.reportService.addReport(newReport).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Report Generated!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show('Report not generated!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/']);
      }
    });
  }

}
