import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-bill',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.scss',
})
export class AddBillComponent {
  bill = {
    consumerId: '',
    billingPeriod: '',
    billDate: '',
    dueDate: '',
    disconnectionDate: '',
    billAmount: null,
    lateFee: 0,
    status: '',
  };

  errors: any = {};
  message: string = '';
  messageType: string = '';

  // Mock API data for consumer IDs
  validConsumers = ['C12345', 'C67890'];

  // Mock API for duplicate check
  existingBills = [{ consumerId: 'C12345', billingPeriod: '2024-06' }];

  // Save Bill Function
  saveBill(event: Event) {
    event.preventDefault();
    this.errors = {};

    // Validation
    if (
      !this.bill.consumerId ||
      !this.validConsumers.includes(this.bill.consumerId)
    ) {
      this.errors.consumerId = 'Invalid Consumer ID.';
    }
    if (!this.bill.billingPeriod) {
      this.errors.billingPeriod = 'Billing Period is required.';
    }
    if (
      !this.bill.billDate ||
      !this.bill.dueDate ||
      new Date(this.bill.billDate) >= new Date(this.bill.dueDate)
    ) {
      this.errors.dueDate = 'Due Date must be after the Bill Date.';
    }
    if (!this.bill.billAmount || this.bill.billAmount <= 0) {
      this.errors.billAmount = 'Bill Amount must be positive.';
    }
    if (this.bill.lateFee < 0) {
      this.errors.lateFee = 'Late Fee must be a positive number.';
    }
    if (!this.bill.status) {
      this.errors.status = 'Status is required.';
    }

    // Check for duplicate bills
    const duplicate = this.existingBills.find(
      (b) =>
        b.consumerId === this.bill.consumerId &&
        b.billingPeriod === this.bill.billingPeriod
    );
    if (duplicate) {
      this.errors.duplicate =
        'A bill for this consumer and period already exists.';
    }

    // If errors exist, do not proceed
    if (Object.keys(this.errors).length > 0) return;

    // Mock save
    this.message = `Bill for Consumer ID ${this.bill.consumerId} added successfully.`;
    this.messageType = 'alert-success';
  }

  // Navigate to Dashboard
  goToDashboard() {
    // Logic to navigate to the dashboard
    console.log('Navigating to Dashboard');
  }
}
