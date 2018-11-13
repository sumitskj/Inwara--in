import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ReportService } from '../services/report.service';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  title: String;
  category: String;
  body: String;
  author: String;
  content: String;
  report: String;
  key: String;
  name: String;
  email: String;
  phone: String;

  // tslint:disable-next-line:max-line-length
  constructor(private customerService: CustomerService,  private router: Router, private flashMessage: FlashMessagesService, private reportService: ReportService, private validateService: ValidateService) { }
  @ViewChild('pdf') pdf: ElementRef;
  ngOnInit() {
  }

  onFindReport() {
    console.log(this.key);
    this.reportService.getReport(this.key).subscribe(data => {
      console.log(data);
      if (data == null) {
        this.content = 'No report found.';
        this.report = null;
        return true;
      } else {
        this.report = data;
        this.title = data.title;
        this.category = data.category;
        this.body = data.body;
        this.author = data.author;
        return true;
      }
    });
  }

  onPdf() {
    const newUser = {
      name: this.name,
      email: this.email,
      phone: this.phone
    };

    if (!this.validateService.validateCustomer(newUser)) {
      this.flashMessage.show('Please fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(newUser.email)) {
      this.flashMessage.show('Email is not correct.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.customerService.addCustomer(newUser).subscribe(data => {
      if (data.success) {
          let doc = new jsPDF();
          let specialElementHandlers = {
            '#editors': function(element, renderer) {
              return true;
            }
          };
          let pdf =  this.pdf.nativeElement;
          doc.fromHTML(pdf.innerHTML, 15, 15, {
            'width': 190,
            'elementHandlers': specialElementHandlers
          });

          doc.save('test.pdf');

        this.flashMessage.show('Report Downloading Started', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/reports']);
      } else {
        this.flashMessage.show('You are not registered.', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/reports']);
      }
    });

  }

}
