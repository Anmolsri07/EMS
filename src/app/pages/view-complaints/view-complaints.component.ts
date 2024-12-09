import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IComplaint } from '../../interfaces/complaint';

@Component({
  selector: 'app-view-complaints',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-complaints.component.html',
  styleUrl: './view-complaints.component.scss',
})
export class ViewComplaintsComponent {
  constructor(private location: Location, private apiService: ApiService) {}
  // User input
  complaintId: string = '';
  selectedStatus: string = '';

  // Sample complaint data (replace with API data)
  complaints: IComplaint[] = [];

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.apiService.getAllComplaint(user.customerId).subscribe({
      next: (value) => {
        if(typeof value !== 'string') {
          this.complaints = (value as IComplaint[])
          this.filteredComplaints = value as IComplaint[];
        }
      },
    });
  }

  // Filtered complaints to display
  filteredComplaints = this.complaints;

  // Search complaints based on ID or Status
  searchComplaint(event: Event) {
    event.preventDefault();

    this.filteredComplaints = this.complaints.filter((complaint) => {
      const matchesId =
        this.complaintId === '' ||
        complaint.complaintId.toLowerCase().includes(this.complaintId.toLowerCase());
      const matchesStatus =
        this.selectedStatus === '' || complaint.status === this.selectedStatus;

      return matchesId && matchesStatus;
    });
  }

  handleBack() {
    this.location.back();
  }
}
