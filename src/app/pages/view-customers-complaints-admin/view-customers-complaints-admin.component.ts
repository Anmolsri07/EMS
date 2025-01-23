import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-customers-complaints-admin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-customers-complaints-admin.component.html',
  styleUrl: './view-customers-complaints-admin.component.scss',
})
export class ViewCustomersComplaintsAdminComponent {
  searchCriteria = {
    customerOrComplaintId: '',
    complaintType: '',
    startDate: '',
    endDate: '',
  };

  complaints: any = [];
  errorMessage: string = '';
  successMessage: string = '';

  // Mock data for complaints
  allComplaints = [
    {
      complaintId: 'C123',
      customerId: 'C12345',
      complaintType: 'Billing Issue',
      dateSubmitted: '2024-10-01',
      status: 'Open',
      assignedStaff: 'Staff1',
      lastUpdated: '2024-10-02',
    },
    {
      complaintId: 'C124',
      customerId: 'C67890',
      complaintType: 'Service Interruption',
      dateSubmitted: '2024-10-03',
      status: 'In Progress',
      assignedStaff: 'Staff2',
      lastUpdated: '2024-10-04',
    },
  ];

  // Search Complaints based on criteria
  searchComplaints(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.complaints = [];

    const { customerOrComplaintId, complaintType, startDate, endDate } =
      this.searchCriteria;

    // Filter complaints based on search criteria
    this.complaints = this.allComplaints.filter((complaint) => {
      const matchesCustomerId = customerOrComplaintId
        ? complaint.customerId.includes(customerOrComplaintId) ||
          complaint.complaintId.includes(customerOrComplaintId)
        : true;
      const matchesComplaintType = complaintType
        ? complaint.complaintType === complaintType
        : true;
      const matchesDateRange =
        startDate && endDate
          ? new Date(complaint.dateSubmitted) >= new Date(startDate) &&
            new Date(complaint.dateSubmitted) <= new Date(endDate)
          : true;
      return matchesCustomerId && matchesComplaintType && matchesDateRange;
    });

    if (this.complaints.length === 0) {
      this.errorMessage = 'No complaints found based on the search criteria.';
    }
  }

  // Update complaint status
  updateStatus(complaint: any) {
    // Logic to update complaint status
    complaint.status = 'Resolved'; // Example status update
    complaint.lastUpdated = new Date().toString();

    // Display confirmation message
    this.successMessage = `Complaint ID ${complaint.complaintId} status updated successfully to Resolved.`;
  }

  // Export complaints to CSV
  exportToCSV() {
    // Logic to export complaint data to CSV
    console.log('Exporting complaints to CSV');
  }

  // Export complaints to PDF
  exportToPDF() {
    // Logic to export complaint data to PDF
    console.log('Exporting complaints to PDF');
  }
}
