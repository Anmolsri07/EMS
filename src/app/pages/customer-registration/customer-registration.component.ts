import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.scss',
})
export class CustomerRegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        consumerNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{13}$/)],
        ],
        fullName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
        ],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        customerType: ['', Validators.required],
        userId: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get consumerNumber() {
    return this.registrationForm.get('consumerNumber');
  }
  get fullName() {
    return this.registrationForm.get('fullName');
  }
  get address() {
    return this.registrationForm.get('address');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get mobileNumber() {
    return this.registrationForm.get('mobileNumber');
  }
  get customerType() {
    return this.registrationForm.get('customerType');
  }
  get userId() {
    return this.registrationForm.get('userId');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { fullName, email } = this.registrationForm.value;
      alert(`Registration Successful!\n\nName: ${fullName}\nEmail: ${email}`);
    }
  }
}
