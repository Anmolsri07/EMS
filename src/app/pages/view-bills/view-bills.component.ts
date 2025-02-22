import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IBill, IViewBill } from '../../interfaces/bills';
import { UserType } from '../../interfaces/users';

@Component({
  selector: 'app-view-bills',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bills.component.html',
  styleUrl: './view-bills.component.scss',
})
export class ViewBillsComponent {
  bills: IBill[] = [];

  totalAmount: number = 0;
  isBillSelected: boolean = false;

  currentUser = JSON.parse(localStorage.getItem('user') as string);

  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.updateTotal();
    if (this.currentUser.role === UserType.CUSTOMER) {
      this.apiService.getAllBills(this.currentUser.customerId).subscribe({
        next: (value) => {
          // ?? Avoid returning a plain string when no data is found; it's not a good practice for server responses.
          if (typeof value !== 'string') {
            this.bills = value as IBill[];
            console.log(value);
          }
        },
      });
    } else if (this.currentUser.role === UserType.ADMIN) {
      this.apiService.getAdminAllBills().subscribe({
        next: (value)=> {
          // ?? Avoid returning a plain string when no data is found; it's not a good practice for server responses.
          if (typeof value !== 'string') {
            this.bills = value as IBill[];
            console.log(value);
          }
        }
      })
    }
  }

  // Update total amount based on selected bills
  updateTotal(): void {
    // this.totalAmount = this.bills
    //   .filter((bill) => bill.selected).reduce(
    //     (sum, bill) => sum + (+bill.bill_amount || +bill.payable_amount),
    //     0
    //   );
  }

  // Select or deselect all bills
  selectAll(event: any): void {
    // const isSelected = event.target.checked;
    // this.bills.forEach((bill) => (bill.selected = isSelected));
    // this.updateTotal();
  }

  // Proceed to the payment screen
  proceedToPay(): void {
    // Logic for handling selected bills
    // const selectedBills = this.bills.filter((bill) => bill.selected);
    // if (selectedBills.length > 0) {
    //   this.router.navigate(['/payment'], { state: { bills: selectedBills } });
    // } else {
    //   alert('Please select at least one bill to proceed.');
    // }
  }

  payBill(billNumber: string, billAmount: string) {
    this.isBillSelected = true;
    const isConfirm = confirm(
      'bill number ' + billNumber + ' Amount ' + billAmount
    );
    if (isConfirm) {
      this.router.navigate([`/pay-bills/${billNumber}/${billAmount}`]);
    }
    this.isBillSelected = false;
  }

  handleBack() {
    this.location.back();
  }
}
