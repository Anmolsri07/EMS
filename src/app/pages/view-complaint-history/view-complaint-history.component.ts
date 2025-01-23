import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-complaint-history',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './view-complaint-history.component.html',
  styleUrl: './view-complaint-history.component.scss',
})
export class ViewComplaintHistoryComponent {
  constructor(private location: Location) {}
  // User input for filtering
  searchId: string = '';
  filterStatus: string = '';

  // Sample complaint data (replace with API integration)
  complaints = [
    {
      id: 'C12345',
      type: 'Billing Issue',
      date: '2024-12-01',
      status: 'Pending',
      description: 'Incorrect bill amount for November.',
      notes: 'Customer service is reviewing the issue.',
    },
    {
      id: 'C67890',
      type: 'Service Interruption',
      date: '2024-11-25',
      status: 'Resolved',
      description: 'Power outage reported in the area.',
      notes: 'Issue resolved on 2024-11-26.',
    },
    {
      id: 'C67890',
      type: 'Service Interruption',
      date: '2024-11-25',
      status: 'Resolved',
      description: 'Power outage reported in the area.',
      notes: 'Issue resolved on 2024-11-26.',
    },
    {
      id: 'C67890',
      type: 'Service Interruption',
      date: '2024-11-25',
      status: 'Resolved',
      description: 'Power outage reported in the area.',
      notes: 'Issue resolved on 2024-11-26.',
    },
    {
      id: 'C67890',
      type: 'Service Interruption',
      date: '2024-11-25',
      status: 'Resolved',
      description: 'Power outage reported in the area.',
      notes: 'Issue resolved on 2024-11-26.',
    },
  ];

  // Data for display
  filteredComplaints = this.complaints;
  selectedComplaint: any = null;

  // Filter complaints based on search and status
  searchComplaints(event: Event) {
    event.preventDefault();
    this.filteredComplaints = this.complaints.filter((complaint) => {
      const matchesId =
        this.searchId === '' ||
        complaint.id.toLowerCase().includes(this.searchId.toLowerCase());
      const matchesStatus =
        this.filterStatus === '' || complaint.status === this.filterStatus;

      return matchesId && matchesStatus;
    });
  }

  // View details of a complaint
  viewDetails(complaint: any) {
    this.selectedComplaint = complaint;
  }

  handleBack() {
    this.location.back()
  }
}
