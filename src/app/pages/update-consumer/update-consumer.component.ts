import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-consumer',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-consumer.component.html',
  styleUrl: './update-consumer.component.scss',
})
export class UpdateConsumerComponent {
  constructor(private location: Location) {}
  searchQuery: string = '';
  searchResults: any[] = [];
  selectedCustomer: any = null;
  message: string = '';

  // Mock Data (replace with API)
  customers = [
    {
      customerId: 'C12345',
      consumerNumber: 'CN67890',
      name: 'John Doe',
      address: '123 Main Street, City',
      contact: '9876543210',
      customerType: 'Residential',
    },
  ];

  // Search customers
  searchCustomers(event: Event) {
    event.preventDefault();
    this.searchResults = this.customers.filter(
      (customer) =>
        customer.customerId.includes(this.searchQuery) ||
        customer.consumerNumber.includes(this.searchQuery) ||
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Edit customer
  editCustomer(customer: any) {
    this.selectedCustomer = { ...customer }; // Clone to avoid direct mutation
  }

  // Update customer details
  updateCustomer(event: Event) {
    event.preventDefault();
    const index = this.customers.findIndex(
      (c) => c.customerId === this.selectedCustomer.customerId
    );
    if (index !== -1) {
      this.customers[index] = { ...this.selectedCustomer };
      this.message = 'Customer details updated successfully!';
      this.selectedCustomer = null; // Exit edit mode
    } else {
      this.message = 'Error updating customer details. Please try again.';
    }
  }

  // Cancel editing
  cancelEdit() {
    this.selectedCustomer = null;
    this.message = '';
  }

  handleBack() {
    this.location.back();
  }
}
