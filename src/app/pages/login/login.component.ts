import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userType: string = 'customer'; // Default user type
  username: string = '';
  password: string = '';

  onSubmit(form: any): void {
    if (form.valid) {
      if (this.userType === 'admin') {
        console.log('Admin Login:', this.username, this.password);
        // Implement admin login logic here
      } else if (this.userType === 'customer') {
        console.log('Customer Login:', this.username, this.password);
        // Implement customer login logic here
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
