import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IBill } from '../../interfaces/bills';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bill',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.scss',
})
export class AddBillComponent {
  constructor(private apiService: ApiService, private router: Router) {}
  bill: IBill = {
    consumerId: '',
    billNumber: '',
    paymentStatus: '',
    billDate: '',
    dueDate: '',
    billAmount: '',
    payableAmount: '',
    electricityUsage: ''
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
    if (this.bill.consumerId && this.bill.dueDate) {
      // Example check
      if (false) {
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
    // this.apiService.getCustomerByCustomerId()
    console.log('this.this.bill', this.bill);

    this.apiService.createBill(this.bill).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {},
      complete: () => {},
    });
    console.log(this.bill);
  }

  goToDashboard() {
   this.router.navigate(['/home'])
  }
}
