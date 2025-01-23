import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-add-customers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.scss',
})
export class AddCustomersComponent {
  addCustomerForm: FormGroup;
  isCreating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private readonly apiService: ApiService
  ) {
    this.addCustomerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      customerType: ['', Validators.required],
      userId: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.addCustomerForm.valid) {
      const customerData = {
        ...this.addCustomerForm.value,
        password: this.addCustomerForm.value.userId,
      };
      this.isCreating = true;
      this.apiService.createNewCustomer(customerData).subscribe({
        next: (value) => {
          if (typeof value === 'string') {
            alert(JSON.stringify(value));
            return;
          } else {
            alert('Customer register successfully');
            this.location.back();
          }
        },
        error: () => {
          alert('Customer register fail, some internal server error?');
        },
        complete: () => {
          this.isCreating = false;
        },
      });
    }
  }

  handleSuccess(response: any) {
    alert(`Customer added successfully!
      Customer ID: ${response.customerId},
      Name: ${response.fullName},
      Email: ${response.email}`);
    // Navigate to add consumer ID page
  }

  handleError(error: any) {
    alert(error.message || 'An error occurred while adding the customer.');
  }

  handleBack() {
    this.location.back();
  }
}
