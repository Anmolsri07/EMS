import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-consumer',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-consumer.component.html',
  styleUrl: './add-consumer.component.scss',
})
export class AddConsumerComponent {
  searchQuery: string = '';
  customers: any[] = [];
  searchCompleted: boolean = false;

  consumer = {
    consumerId: '',
    address: '',
    contact: '',
    customerType: '',
  };

  successMessage: string = '';

  // Sample data storage
  allConsumers: any[] = [];

  // Sample data
  allCustomers = [
    { id: 'C001', name: 'John Doe' },
    { id: 'C002', name: 'Jane Smith' },
    { id: 'C003', name: 'Alice Johnson' },
  ];

  searchCustomer() {
    this.customers = this.allCustomers.filter(
      (customer) =>
        customer.id.includes(this.searchQuery) ||
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.searchCompleted = true;
  }

  selectCustomer(customer: any) {
    console.log('Selected customer:', customer);
    // Handle customer selection
  }

  submitForm() {
    if (
      this.consumer.consumerId &&
      this.consumer.address &&
      this.consumer.contact &&
      this.consumer.customerType
    ) {
      const consumerExists = this.allConsumers.some(
        (c) => c.consumerId === this.consumer.consumerId
      );
      if (consumerExists) {
        alert('Consumer ID already exists. Please use a unique ID.');
      } else {
        this.allConsumers.push({ ...this.consumer });
        this.successMessage = `Consumer ID ${this.consumer.consumerId} added successfully!`;
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.consumer = {
      consumerId: '',
      address: '',
      contact: '',
      customerType: '',
    };
  }
}
