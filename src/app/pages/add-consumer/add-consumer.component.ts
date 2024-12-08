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
  customerId: string | null = null

  consumer: IConsumer = {
    consumerId: '',
    address: '',
    mobileNumber: '',
    customerType: CustomerType.COMMERCIAL,
    customerId: ''
  };

  successMessage: string = '';

  // Sample data storage
  allConsumers: any[] = [];

  async searchCustomer() {
    this.apiService.getCustomerByCustomerId(this.searchQuery).subscribe({
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

  selectCustomer(customer: any) {
    console.log('Selected customer:', customer);
    // Handle customer selection
  }

  submitForm() {
    if(!this.customerId) {
      alert('Select customer')
      return;
    }
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
      customerId: ''
    };
  }

  handleBack() {
    this.location.back();
  }
}
