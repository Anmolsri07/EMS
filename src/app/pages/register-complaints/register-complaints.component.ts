import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-complaints',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-complaints.component.html',
  styleUrl: './register-complaints.component.scss',
})
export class RegisterComplaintsComponent {
  constructor(private fb: FormBuilder, private location: Location) {}

  complaintForm: FormGroup | any;
  categories: string[] = []; // Will hold categories for selected complaint type
  contactInfo = { email: 'user@example.com', phone: '1234567890' }; // Sample registered contact information

  complaintTypes = ['Billing Issue', 'Power Outage', 'Meter Reading Issue'];

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      complaintType: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      preferredContactMethod: ['email', Validators.required],
      contactDetails: [
        { value: this.contactInfo.email, disabled: false },
        [Validators.required, Validators.email],
      ],
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
          : '2-5 days'; // Estimate resolution time

      // Display confirmation with complaint details
      alert(`Complaint Submitted Successfully!
        \nComplaint ID: ${complaintId}
        \nResolution Time: ${resolutionTime}
        \nDetails: ${JSON.stringify(this.complaintForm.value)}
      `);
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }

  onReset(): void {
    this.complaintForm.reset();
    this.contactInfo = { email: 'user@example.com', phone: '1234567890' }; // Reset contact information
  }

  handleBack() {
    this.location.back()
  }
}
