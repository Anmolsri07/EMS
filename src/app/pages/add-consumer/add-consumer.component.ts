import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CustomerType, IConsumer } from '../../interfaces/users';

@Component({
  selector: 'app-add-consumer',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-consumer.component.html',
  styleUrl: './add-consumer.component.scss',
})
export class AddConsumerComponent {
  constructor(
    private location: Location,
    private readonly apiService: ApiService
  ) {}
  searchQuery: string = '';
  customers: any[] = [];
  searchCompleted: boolean = false;
  customerId: string | null = null;

  consumer: IConsumer = {
    consumerId: '',
    address: '',
    mobileNumber: '',
    customerType: CustomerType.COMMERCIAL,
    customerId: '',
  };

  successMessage: string = '';

  // Sample data storage
  allConsumers: any[] = [];

  async searchCustomer() {
    this.apiService.getConsumerByCustomerId(this.searchQuery).subscribe({
      next: (value) => {
        if (typeof value !== 'string') {
          this.customers = [value];
        }
      },
      error(err) {
        console.log('error', err);
      },
      complete: () => {
        this.searchCompleted = true;
      },
    });
  }

  selectCustomer(customer: IConsumer) {
    console.log('Selected customer:', customer.customerId);
    // Handle customer selection
    this.consumer.consumerId = `${customer.consumerId}`;
  }

  submitForm() {
    this.apiService.createNewConsumer(this.consumer).subscribe({
      next: (value) => {
        alert(value);
        if (typeof value === 'string') this.successMessage = value;
      },
      error(err) {
        alert(JSON.stringify(err));
      },
    });
    // if (
    //   this.consumer.consumerId &&
    //   this.consumer.address &&
    //   this.consumer.contact &&
    //   this.consumer.customerType
    // ) {
    //   const consumerExists = this.allConsumers.some(
    //     (c) => c.consumerId === this.consumer.consumerId
    //   );
    //   if (consumerExists) {
    //     alert('Consumer ID already exists. Please use a unique ID.');
    //   } else {
    //     this.allConsumers.push({ ...this.consumer });
    //     this.successMessage = `Consumer ID ${this.consumer.consumerId} added successfully!`;
    //     this.resetForm();
    //   }
    // }
  }

  resetForm() {
    this.consumer = {
      consumerId: '',
      address: '',
      mobileNumber: '',
      customerType: CustomerType.COMMERCIAL,
      customerId: '',
    };
  }

  handleBack() {
    this.location.back();
  }
}
