import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  customer = {
    fullName: 'Anmol sri',
    accountNumber: '6205357513',
    billingAddress: 'Anmol Chapri gali dumka jharkhand',
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
