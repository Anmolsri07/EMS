import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-bills',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bills.component.html',
  styleUrl: './view-bills.component.scss',
})
export class ViewBillsComponent {
  bills = [
    {
      consumerId: 'C001',
      billNumber: 'B001',
      paymentStatus: 'Unpaid',
      connectionType: 'Domestic',
      connectionStatus: 'Connected',
      mobileNumber: '1234567890',
      billPeriod: 'Jan 2024',
      billDate: '2024-01-01',
      dueDate: '2024-01-15',
      disconnectionDate: '',
      dueAmount: 500,
      payableAmount: 500,
      selected: false,
    },
    {
      consumerId: 'C002',
      billNumber: 'B002',
      paymentStatus: 'Unpaid',
      connectionType: 'Commercial',
      connectionStatus: 'Connected',
      mobileNumber: '0987654321',
      billPeriod: 'Feb 2024',
      billDate: '2024-02-01',
      dueDate: '2024-02-15',
      disconnectionDate: '',
      dueAmount: 700,
      payableAmount: 700,
      selected: false,
    },
    // More bills can be added here
  ];

  totalAmount: number = 0;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.updateTotal();
  }

  // Update total amount based on selected bills
  updateTotal(): void {
    this.totalAmount = this.bills
      .filter((bill) => bill.selected)
      .reduce((sum, bill) => sum + (bill.payableAmount || bill.dueAmount), 0);
  }

  // Select or deselect all bills
  selectAll(event: any): void {
    const isSelected = event.target.checked;
    this.bills.forEach((bill) => (bill.selected = isSelected));
    this.updateTotal();
  }

  // Proceed to the payment screen
  proceedToPay(): void {
    // Logic for handling selected bills
    const selectedBills = this.bills.filter((bill) => bill.selected);
    if (selectedBills.length > 0) {
      this.router.navigate(['/payment'], { state: { bills: selectedBills } });
    } else {
      alert('Please select at least one bill to proceed.');
    }
  }

  handleBack() {
    this.location.back()
  }
}
