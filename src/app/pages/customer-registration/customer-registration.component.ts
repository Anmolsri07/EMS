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
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-customer-registration',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss'],
})
export class CustomerRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly apiService: ApiService
  ) {
    this.registrationForm = this.fb.group(
      {
        customerId: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{13}$/),
        ]),
        name: new FormControl('', [
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

  get customerId(): AbstractControl {
    return this.registrationForm.get('customerId')!;
  }
  get name(): AbstractControl {
    return this.registrationForm.get('name')!;
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
      const { name, email, password, confirmPassword } =
        this.registrationForm.value;
      if (password !== confirmPassword) {
        alert('Confirm your password?');
        return;
      }
      fetch('https://20kmf8l0-8080.inc1.devtunnels.ms/api/customers/register', {
        method: 'POST',
        body: JSON.stringify(this.registrationForm.value),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          const res = await response.json();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.apiService.createNewCustomer(this.registrationForm.value);
      alert(`Registration Successful!\n\nName: ${name}\nEmail: ${email}`);
    }
  }
}
