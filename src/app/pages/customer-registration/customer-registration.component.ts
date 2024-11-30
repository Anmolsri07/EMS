import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ICustomers } from '../../interfaces/customer';

@Component({
  selector: 'app-customer-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss'],
})
export class CustomerRegistrationComponent {
  registrationForm: FormGroup<{
    [key in keyof ICustomers]: FormControl<ICustomers>;
  }>;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        consumerNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{13}$/),
        ]),
        fullName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ]),
        address: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobileNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
        ]),
        customerType: new FormControl('', Validators.required),
        userId: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get consumerNumber(): AbstractControl {
    return this.registrationForm.get('consumerNumber')!;
  }
  get fullName(): AbstractControl {
    return this.registrationForm.get('fullName')!;
  }
  get address(): AbstractControl {
    return this.registrationForm.get('address')!;
  }
  get email(): AbstractControl {
    return this.registrationForm.get('email')!;
  }
  get mobileNumber(): AbstractControl {
    return this.registrationForm.get('mobileNumber')!;
  }
  get customerType(): AbstractControl {
    return this.registrationForm.get('customerType')!;
  }
  get userId(): AbstractControl {
    return this.registrationForm.get('userId')!;
  }
  get password(): AbstractControl {
    return this.registrationForm.get('password')!;
  }
  get confirmPassword(): AbstractControl {
    return this.registrationForm.get('confirmPassword')!;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { fullName, email, password, confirmPassword } = this.registrationForm.value;
      if(password !== confirmPassword) {
        alert('Confirm your password?')
        return;
      }
      alert(`Registration Successful!\n\nName: ${fullName}\nEmail: ${email}`);
    }
  }
}
