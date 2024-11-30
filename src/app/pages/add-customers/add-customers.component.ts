import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.scss',
})
export class AddCustomersComponent {
  addCustomerForm: FormGroup;
  defaultPassword: string = 'Default@123'; // Assign default password

  constructor(private fb: FormBuilder) {
    this.addCustomerForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      consumerNumber: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: [
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
        password: this.defaultPassword,
      };
      console.log('Customer Data:', customerData);

      // Call your service to submit the data
      // this.customerService.addCustomer(customerData).subscribe(
      //   response => this.handleSuccess(response),
      //   error => this.handleError(error)
      // );
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
}
