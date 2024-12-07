import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private readonly router: Router) {}

  customerName = 'John Doe';
  accountNumber = '123456789';
  billingAddress = '123 Elm Street, City, Country';
  billingPeriod = '01 Nov 2024 - 30 Nov 2024';
  dueDate = '15 Dec 2024';
  amountDue = 120.5;
  isUnpaid = true;

  features = [
    { name: 'View Bills', icon: 'bi-receipt', route: '/view-bills' },
    { name: 'Pay Bill', icon: 'bi-credit-card', route: '/view-bills' },
    { name: 'Bill History', icon: 'bi-calendar2-week', route: '/bill-history' },
    {
      name: 'Register Complaint',
      icon: 'bi-chat-left-text',
      route: '/registration-complaint',
    },
    {
      name: 'Complaint Status',
      icon: 'bi-clipboard-check',
      route: '/view-customer-complaints',
    },
  ];

  payNow() {
    console.log('Redirect to payment page');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  goToProfile() {
    console.log('Redirect to profile page');
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
