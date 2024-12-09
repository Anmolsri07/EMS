import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConsumer } from '../../interfaces/users';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-remove-consumer-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './remove-consumer-component.component.html',
  styleUrl: './remove-consumer-component.component.scss',
})
export class RemoveConsumerComponentComponent {
  searchQuery: string = '';
  searchResults: IConsumer[] = [];
  selectedCustomer: any = null;
  message: string = '';
  customers: IConsumer[] = [];

  constructor(
    private location: Location,
    private readonly apiService: ApiService
  ) {}

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

  // Mock Data (replace with API)

  // Search customers
  searchCustomers(event: Event) {
    event.preventDefault();
    this.searchResults = this.customers.filter(
      (customer) =>
        customer.customerId.includes(this.searchQuery) ||
        customer.consumerId.includes(this.searchQuery)
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
    console.log('this.selectedCustomer', this.selectedCustomer);
    this.apiService.deleteConsumer(this.selectedCustomer.consumerId).subscribe({
      next: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          this.message = value;
          this.ngOnInit();
          this.selectedCustomer = null;
        }
      },
      error(err) {
        console.log(err);
      },
    });
    return;

    if (index !== -1) {
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
