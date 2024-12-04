import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserType } from '../../interfaces/users';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userType: string = UserType.CUSTOMER;
  username: string = '';
  password: string = '';

  onSubmit(form: any): void {
    if (form.valid) {
      if (this.userType === UserType.ADMIN) {
        console.log('Admin Login:', this.username, this.password);
        // Implement admin login logic here
      } else if (this.userType === UserType.CUSTOMER) {
        console.log('Customer Login:', this.username, this.password);
        // Implement customer login logic here
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
