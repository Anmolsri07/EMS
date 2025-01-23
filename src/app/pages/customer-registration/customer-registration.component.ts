import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-registration',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss'],
})
export class CustomerRegistrationComponent {
  registrationForm: FormGroup;
  isCreating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.registrationForm = this.fb.group(
      {
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

  onSubmit() {
    if (this.registrationForm.valid) {
      const { name, email, password, confirmPassword } =
        this.registrationForm.value;
      if (password !== confirmPassword) {
        alert('Confirm your password?');
        return;
      }
      this.isCreating = true;

      this.apiService.createNewCustomer(this.registrationForm.value).subscribe({
        next: (value) => {
          if (typeof value !== 'string') {
            alert('Customer registration fail?');
            return;
          } else {
            alert('Customer registration successfully' + value);
            this.router.navigate(['/login']);
          }
        },
        error(err) {
          alert(JSON.stringify(err));
        },
        complete: () => {
          this.isCreating = false;
        },
      });
    }
  }

  handleBack() {
    this.location.back();
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
}
