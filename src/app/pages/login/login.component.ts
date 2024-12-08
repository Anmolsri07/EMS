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
  isCreating: boolean = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.isCreating = true;
      this.apiService
        .loginCustomer({
          userId: this.userId,
          password: this.password,
          role: this.userType,
        })
        .subscribe({
          next: (value) => {
            if (typeof value === 'string') {
              alert(value);
              return;
            } else {
              alert('Login successfully');
            }
            (value as any).role = this.userType;
            console.log(value);
            localStorage.setItem('user', JSON.stringify(value));
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
          },
          complete: ()=> {
            this.isCreating = false;
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
