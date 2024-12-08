import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICustomers, UserType } from '../../interfaces/users';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private readonly router: Router) {}
  public currentUser: ICustomers = JSON.parse(
    localStorage.getItem('user') as string
  );

  customerName = this.currentUser.name ?? '';

  features = [
    {
      name: 'View Bills',
      icon: 'bi-receipt',
      route: '/view-bills',
      role: UserType.ADMIN,
    },
    {
      name: 'Add Bill',
      icon: 'bi-credit-card',
      route: '/add-bills',
      role: UserType.ADMIN,
    },
    {
      name: 'Add Customer',
      icon: 'bi-clipboard-check',
      route: '/add-customer',
      role: UserType.ADMIN,
    },
    {
      name: 'Add Consumer',
      icon: 'bi-clipboard-check',
      route: '/add-consumer',
      role: UserType.ADMIN,
    },
    {
      name: 'Update Consumer',
      icon: 'bi-clipboard-check',
      route: '/update-consumer',
      role: UserType.ADMIN,
    },
    {
      name: 'Remove Consumer',
      icon: 'bi-clipboard-check',
      route: '/remove-consumer',
      role: UserType.ADMIN,
    },
    {
      name: 'Pay Bill',
      icon: 'bi-credit-card',
      route: '/view-bills',
      role: UserType.CUSTOMER,
    },
    {
      name: 'Bill History',
      icon: 'bi-calendar2-week',
      route: '/bill-history',
      role: UserType.CUSTOMER,
    },
    {
      name: 'Complaint Status',
      icon: 'bi-clipboard-check',
      route: '/view-customer-status',
      role: UserType.CUSTOMER,
    },
    {
      name: 'View Bill Summary',
      icon: 'bi-clipboard-check',
      route: '/view-bill-summary',
      role: UserType.CUSTOMER,
    },
    {
      name: 'Registration Complaint',
      icon: 'bi-clipboard-check',
      route: '/registration-complaint',
      role: UserType.CUSTOMER,
    },
    {
      name: 'View Complaint History',
      icon: 'bi-clipboard-check',
      route: '/view-complaint-history',
      role: UserType.CUSTOMER,
    },
    {
      name: 'View Bills',
      icon: 'bi-clipboard-check',
      route: '/view-bills',
      role: UserType.CUSTOMER,
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
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
