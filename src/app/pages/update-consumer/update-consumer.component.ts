import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IConsumer } from '../../interfaces/users';

@Component({
  selector: 'app-update-consumer',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-consumer.component.html',
  styleUrl: './update-consumer.component.scss',
})
export class UpdateConsumerComponent {
  constructor(
    private location: Location,
    private readonly apiService: ApiService
  ) {}
  searchQuery: string = '';
  searchResults: IConsumer[] = [];
  selectedCustomer: any = null;
  message: string = '';

  // Mock Data (replace with API)
  customers: IConsumer[] = [];

  ngOnInit() {
    this.apiService.getAdminAllConsumers().subscribe({
      next: (value) => {
        if (typeof value !== 'string') {
          this.customers = value as IConsumer[];
          this.searchResults = value as IConsumer[];
        }
      },
    });
  }

  // Search customers
  searchCustomers(event: Event) {
    event.preventDefault();
    this.searchResults = this.customers.filter(
      (customer) =>
        customer.customerId.includes(this.searchQuery) ||
        customer.consumerId.includes(this.searchQuery) ||
        customer.mobileNumber
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
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
      console.log('this.selectedCustomer', this.selectedCustomer);
      this.apiService.updateConsumer(this.selectedCustomer).subscribe({
        next: (value) => {
          console.log(value);
          this.customers[index] = { ...this.selectedCustomer };
          if (typeof value === 'string') {
            this.message = value;
          }
        },
        error: (err) => {
          alert('update fail');
        },
      });
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
