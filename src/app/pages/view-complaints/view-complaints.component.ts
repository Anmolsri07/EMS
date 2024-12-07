import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-complaints',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-complaints.component.html',
  styleUrl: './view-complaints.component.scss',
})
export class ViewComplaintsComponent {
  constructor(private location: Location){}
  // User input
  complaintId: string = '';
  selectedStatus: string = '';

  // Sample complaint data (replace with API data)
  complaints = [
    {
      id: 'C12345',
      date: '2024-12-01',
      type: 'Billing Issue',
      status: 'Pending',
    },
    {
      id: 'C67890',
      date: '2024-11-25',
      type: 'Service Interruption',
      status: 'In Progress',
    },
    {
      id: 'C54321',
      date: '2024-11-15',
      type: 'Meter Issue',
      status: 'Resolved',
    },
  ];

  // Filtered complaints to display
  filteredComplaints = this.complaints;

  // Search complaints based on ID or Status
  searchComplaint(event: Event) {
    event.preventDefault();

    this.filteredComplaints = this.complaints.filter((complaint) => {
      const matchesId =
        this.complaintId === '' ||
        complaint.id.toLowerCase().includes(this.complaintId.toLowerCase());
      const matchesStatus =
        this.selectedStatus === '' || complaint.status === this.selectedStatus;

      return matchesId && matchesStatus;
    });
  }

  handleBack() {
    this.location.back()
  }
}
