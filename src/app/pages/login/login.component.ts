import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserType } from '../../interfaces/users';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  userType: UserType = UserType.CUSTOMER;

  constructor(private readonly apiService: ApiService, private readonly router: Router) { }

  onSubmit(form: any): void {
    if (form.valid) {
      // if (this.userType === UserType.ADMIN) {
      //   this.apiService
      //     .loginAdmin({
      //       password: this.username,
      //       username: this.password,
      //     })
      //     .subscribe({
      //       next: (value) => {
      //         // TODO: add response interfaces & login success conditions
      //         console.log(value);
      //         localStorage.setItem('user', JSON.stringify(value));
      //         this.router.navigate(['/']);
      //       },
      //       error: (err) => {
      //         console.log(err);
      //       },
      //     });
      // } 
      // else if (this.userType === UserType.CUSTOMER) {
      //   this.apiService
      //     .loginCustomer({
      //       password: this.username,
      //       username: this.password,
      //     })
      //     .subscribe({
      //       next: (value) => {
      //         // TODO: add response interfaces & login success conditions
      //         console.log(value);
      //         localStorage.setItem('user', JSON.stringify(value));
      //         this.router.navigate(['/']);
      //       },
      //       error: (err) => {
      //         console.log(err);
      //       },
      //     });
      // }
      this.apiService
        .loginCustomer({
          userId: this.userId,
          password: this.password,
          role: this.userType,
        })
        .subscribe({
          next: (value) => {
            // TODO: add response interfaces & login success conditions
            console.log(value);
            localStorage.setItem('user', JSON.stringify(value));
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
