import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supermarket_frontend';
  isCustomerView: boolean = true;
  currentView: string = 'customer_index.html';

  toggleView() {
    this.isCustomerView = !this.isCustomerView;
    this.currentView = this.isCustomerView ? 'customer_index.html' : 'admin_index.html';
  }
}
