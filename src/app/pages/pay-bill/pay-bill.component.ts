import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-bill',
  imports: [FormsModule, CommonModule],
  templateUrl: './pay-bill.component.html',
  styleUrl: './pay-bill.component.scss',
})
export class PayBillComponent {
  cardDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  };
  totalAmount: number = 1000; // Example amount
  paymentConfirmed: boolean = false;
  paymentError: boolean = false;
  paymentErrorMessage: string = '';
  minExpiryDate: string = new Date().toISOString().split('T')[0]; // Current month and year

  // Submit payment handler
  submitPayment(): void {
    if (this.validatePaymentDetails()) {
      this.paymentConfirmed = true;
    }
  }

  // Validate payment details before confirmation
  validatePaymentDetails(): boolean {
    // Additional validation for expiry date to ensure card is not expired
    const currentDate = new Date();
    const expiryDate = new Date(this.cardDetails.expiryDate);

    if (expiryDate < currentDate) {
      this.paymentErrorMessage = 'The card has expired.';
      this.paymentError = true;
      return false;
    }

    this.paymentError = false;
    return true;
  }

  // Confirm payment and process
  confirmPayment(): void {
    // Process payment (e.g., call payment API)
    // For now, simulate a successful payment
    setTimeout(() => {
      this.showPaymentConfirmation();
    }, 1000);
  }

  // Show the successful payment confirmation
  showPaymentConfirmation(): void {
    alert('Payment Successful!');
    // Navigate to the success page with transaction details
    // Example:
    // this.router.navigate(['/payment-success']);
  }

  // Cancel payment and go back
  cancelPayment(): void {
    this.paymentConfirmed = false;
  }
}
