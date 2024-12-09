import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-pay-bill',
  imports: [FormsModule, CommonModule],
  templateUrl: './pay-bill.component.html',
  styleUrl: './pay-bill.component.scss',
})
export class PayBillComponent {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

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
  billNumber: string = '';

  ngOnInit() {
    this.route.params.subscribe({
      next: (value) => {
        this.totalAmount = value['amount'] as number;
        this.billNumber = value['billNumber'];
      },
    });
  }

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
    setTimeout(() => {
      this.showPaymentConfirmation();
    }, 1000);
  }

  // Show the successful payment confirmation
  showPaymentConfirmation(): void {
    this.apiService
      .payBill('Credit Card', this.billNumber, this.totalAmount)
      .subscribe({
        next: (value) => {
          alert('Payment Successful!');
          console.log(value);
        },
        error: () => {
          alert('payment fail');
        },
      });

    // Navigate to the success page with transaction details
    // Example:
    // this.router.navigate(['/payment-success']);
  }

  // Cancel payment and go back
  cancelPayment(): void {
    this.paymentConfirmed = false;
  }

  goBack() {
    this.location.back();
  }
}
