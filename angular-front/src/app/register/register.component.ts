import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;

  // tslint:disable-next-line:max-line-length
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    const newUser = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateFields(newUser)) {
      this.flashMessage.show('Please fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateEmail(newUser.email)) {
      this.flashMessage.show('Email is not correct.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(newUser).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are Registered!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('You are not registered.', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}
