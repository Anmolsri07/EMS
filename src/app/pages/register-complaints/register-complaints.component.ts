import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-register-complaints',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-complaints.component.html',
  styleUrl: './register-complaints.component.scss',
})
export class RegisterComplaintsComponent {
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private apiService: ApiService
  ) {}
  isCreating: boolean = false;
  complaintForm: FormGroup | any;
  categories: string[] = [];
  consumerIds: string[] = [];

  complaintTypes = ['Billing Issue', 'Power Outage', 'Meter Reading Issue'];

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string)
    this.apiService.getAllConsumers(user.customerId).subscribe({
      next: (value) => {
        this.consumerIds = value as string[];
      },
    });

    this.complaintForm = this.fb.group({
      complaintType: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', Validators.required],
      landmark: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      consumerId: ['', Validators.required],
    });

    // Watch for complaint type changes and update the categories
    this.complaintForm
      .get('complaintType')
      ?.valueChanges.subscribe((complaintType: string) => {
        if (complaintType === 'Billing Issue') {
          this.categories = [
            'Billing Problem',
            'Payment Discrepancy',
            'Invoice Clarity',
          ];
        } else if (complaintType === 'Power Outage') {
          this.categories = ['Partial Outage', 'Full Outage', 'Intermittent'];
        } else if (complaintType === 'Meter Reading Issue') {
          this.categories = [
            'Wrong Meter Reading',
            'No Meter Reading',
            'Meter Fault',
          ];
        } else {
          this.categories = [];
        }
        this.complaintForm.get('category')?.setValue(''); // Reset category when complaint type changes
      });
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      const complaintId = Math.floor(Math.random() * 10000); // Generate a unique ID
      const resolutionTime =
        this.complaintForm.value.complaintType === 'Power Outage'
          ? '1-2 hours'
          : '2-5 days';

      const currentUser = JSON.parse(localStorage.getItem('user') as string);
      this.complaintForm.value.dateRegistered = new Date().toDateString();
      this.complaintForm.value.status = 'Pending';
      this.isCreating = true;
      this.apiService.createComplaint(this.complaintForm.value).subscribe({
        next: (value) => {
          alert('Complaint register success' + value);
          this.location.back();
        },
        error(err) {
          alert(JSON.stringify(err));
        },
        complete: ()=> {
          this.isCreating = false;
        },
      });

      // // Display confirmation with complaint details
      // alert(`Complaint Submitted Successfully!
      //   \nComplaint ID: ${complaintId}
      //   \nResolution Time: ${resolutionTime}
      //   \nDetails: ${JSON.stringify(this.complaintForm.value)}
      // `);
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }

  onReset(): void {
    this.complaintForm.reset();
  }

  handleBack() {
    this.location.back();
  }
}
