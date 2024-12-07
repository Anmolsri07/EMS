import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-remove-consumer-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './remove-consumer-component.component.html',
  styleUrl: './remove-consumer-component.component.scss',
})
export class RemoveConsumerComponentComponent {

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
      status: 'Active',
    },
  ];

  // Search customers
  searchCustomers(event: Event) {
    event.preventDefault();
    this.searchResults = this.customers.filter(
      (customer) =>
        customer.customerId.includes(this.searchQuery) ||
        customer.consumerNumber.includes(this.searchQuery)
    );
  }

  // Select customer to delete
  deleteCustomer(customer: any) {
    this.selectedCustomer = { ...customer };
  }

  // Confirm delete
  confirmDelete(event: Event) {
    event.preventDefault();
    const index = this.customers.findIndex(
      (c) => c.customerId === this.selectedCustomer.customerId
    );
    if (index !== -1) {
      this.customers[index].status = 'Inactive'; // Soft delete
      this.message = 'Customer has been successfully deactivated.';
      this.selectedCustomer = null;
    } else {
      this.message = 'Error deactivating the customer. Please try again.';
    }
  }

  // Cancel deletion
  cancelDelete() {
    this.selectedCustomer = null;
    this.message = '';
  }

  handleBack() {
    this.location.back();
  }
}
