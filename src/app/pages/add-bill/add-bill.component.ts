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
    billAmount: 0,
    lateFee: 0,
    status: '',
  };
  errors: any = {};
  message = '';
  messageType = '';

  validateConsumerId() {
    // Call API to check if consumer ID exists
    if (!this.bill.consumerId) {
      this.errors.consumerId = 'Consumer ID is required.';
    } else {
      this.errors.consumerId = ''; // Clear error if valid
    }
  }

  checkDuplicateBill() {
    // Call API to check for duplicate bills
    if (this.bill.consumerId && this.bill.billingPeriod) {
      // Example check
      if (false) {
        // Replace with actual check
        this.errors.billingPeriod = 'A bill for this period already exists.';
      } else {
        this.errors.billingPeriod = '';
      }
    }
  }

  validateDates() {
    if (new Date(this.bill.billDate) >= new Date(this.bill.dueDate)) {
      this.errors.dueDate = 'Due Date must be after the Bill Date.';
    } else {
      this.errors.dueDate = '';
    }
  }

  saveBill(event: Event) {
    event.preventDefault();
    // Validate inputs and save bill logic here
  }

  goToDashboard() {
    // Navigate to dashboard
  }
}
