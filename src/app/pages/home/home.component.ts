import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  customer = {
    fullName: 'Anmol sri',
    accountNumber: '6205357513',
    billingAddress: 'street no 2 ',
    currentBill: {
      billingPeriod: 'October 2024',
      dueDate: '2024-11-30',
      amountDue: 150.75,
      unpaid: true,
    },
  };

  // This method can be used to simulate logging out
  logout() {
    // Add logic for logging out (e.g., clearing session or redirecting)
    alert('You have logged out!');
  }
}
