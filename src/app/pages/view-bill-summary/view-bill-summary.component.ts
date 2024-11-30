import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-bill-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bill-summary.component.html',
  styleUrl: './view-bill-summary.component.scss',
})
export class ViewBillSummaryComponent {
  bills = [
    {
      consumerId: 'C001',
      billDate: '2024-01-01',
      billPeriod: 'Jan 2024',
      dueAmount: 500,
      dueDate: '2024-01-15',
      selected: false,
    },
    {
      consumerId: 'C002',
      billDate: '2024-02-01',
      billPeriod: 'Feb 2024',
      dueAmount: 700,
      dueDate: '2024-02-15',
      selected: false,
    },
    // More bills can be added
  ];

  selectedBills: any = [];
  totalAmount: number = 0;
  selectedPaymentMethod: string = '';
  error: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // For now, simulate loading of bills
    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.selectedBills = this.bills;
        this.updateTotal();
      } else {
        this.error = true;
      }
    }, 1000); // Simulate network delay
  }

  // Update the total amount when selection changes
  updateTotal(): void {
    this.totalAmount = this.selectedBills
      .filter((bill: any) => bill.selected)
      .reduce((sum: any, bill: any) => sum + bill.dueAmount, 0);
  }

  // Go back to the previous page
  goBack(): void {
    this.router.navigate(['/previous']);
  }

  // Retry loading bills
  retry(): void {
    this.error = false;
    this.ngOnInit(); // Re-run ngOnInit to load the bills
  }

  // Proceed to the payment screen
  proceedToPayment(): void {
    if (this.selectedPaymentMethod && this.totalAmount > 0) {
      // Navigate to the payment screen
      this.router.navigate(['/payment'], {
        state: {
          bills: this.selectedBills.filter((bill: any) => bill.selected),
          paymentMethod: this.selectedPaymentMethod,
        },
      });
    }
  }
}
