import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill-history',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bill-history.component.html',
  styleUrl: './bill-history.component.scss',
})
export class BillHistoryComponent {
  // Sample data for bills
  bills = [
    {
      id: '1',
      billDate: new Date('2024-05-01'),
      billingPeriod: 'May 2024',
      dueDate: new Date('2024-05-15'),
      billAmount: 120.5,
      paymentStatus: 'Paid',
      paymentDate: new Date('2024-05-14'),
      modeOfPayment: 'Credit Card',
    },
    {
      id: '2',
      billDate: new Date('2024-06-01'),
      billingPeriod: 'June 2024',
      dueDate: new Date('2024-06-15'),
      billAmount: 135.75,
      paymentStatus: 'Unpaid',
      paymentDate: null,
      modeOfPayment: null,
    },
    {
      id: '3',
      billDate: new Date('2024-07-01'),
      billingPeriod: 'July 2024',
      dueDate: new Date('2024-07-15'),
      billAmount: 110.3,
      paymentStatus: 'Paid',
      paymentDate: new Date('2024-07-12'),
      modeOfPayment: 'Net Banking',
    },
  ];

  filteredBills = [...this.bills];
  totalAmount = 0;
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  loading = false;
  errorMessage = '';
  paymentStatusFilter = '';

  constructor() {}

  ngOnInit(): void {
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.filteredBills.reduce(
      (sum, bill) => sum + bill.billAmount,
      0
    );
  }

  fetchBills(): void {
    this.loading = true;
    // Simulate filtering based on the selected date range
    if (this.startDate === null) {
      return;
    }
      const filtered = this.bills.filter(
        (bill) =>
          bill.billDate >= (this.startDate as any).value &&
          bill.billDate <= (this.endDate as any).value
      );
    this.filteredBills = filtered;
    this.calculateTotalAmount();
    this.loading = false;
  }

  sortBills(criteria: string): void {
    this.filteredBills = (this.filteredBills as any).sort((a: any, b: any) =>
      a[criteria as any] > b[criteria] ? 1 : -1
    );
    this.calculateTotalAmount();
  }

  filterBills(): void {
    if (this.paymentStatusFilter) {
      this.filteredBills = this.bills.filter(
        (bill) => bill.paymentStatus === this.paymentStatusFilter
      );
    } else {
      this.filteredBills = [...this.bills];
    }
    this.calculateTotalAmount();
  }

  downloadBill(billId: string): void {
    // Simulate downloading a PDF or other file format
    alert('Downloading Bill ' + billId);
  }
}
