import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateFields(user) {
    if ( user.name == undefined || user.email == undefined || user.password == undefined ||user.username == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateCustomer(user) {
    if ( user.name == undefined || user.email == undefined ||user.phone == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePhone(user) {
    var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(user.value.match(phoneNum)) {
      return true;
    } else {
      return false;
    }
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
