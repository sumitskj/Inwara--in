import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.authService.loadToken();
   // console.log(this.authService.authToken);

  }
  onLogout() {
    this.authService.logout();
    this.flashMessage.show('You are logged out.', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/dashboard']);

    return false;
  }
}
