import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IBill } from '../../interfaces/bills';

@Component({
  selector: 'app-view-bill-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bill-summary.component.html',
  styleUrl: './view-bill-summary.component.scss',
})
export class ViewBillSummaryComponent {
  bill: IBill | null = null;

  constructor(
    private router: Router,
    private location: Location,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    // For now, simulate loading of bills
    const currentUser = JSON.parse(localStorage.getItem('user') as string);
    this.apiService.getCurrentBillSummary(currentUser.customerId).subscribe({
      next: (value) => {
        if (typeof value !== 'string') {
          this.bill = value as IBill;
        }
        console.log('value', value);
      },
    });
  }

  // Go back to the previous page
  goBack(): void {
    this.location.back();
  }

  handlePay(billNumber: string, billAmount: string) {
    this.router.navigate([`/pay-bills/${billNumber}/${billAmount}`]);
  }
}
