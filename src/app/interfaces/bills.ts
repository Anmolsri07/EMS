export interface IBill {
  consumerId: string;
  billNumber: string;
  paymentStatus: string;
  billDate: string;
  dueDate: string;
  billAmount: string;
  payableAmount: string;
  electricityUsage: string;
}


// This is only this view and functionality
export interface IViewBill extends IBill {
  selected: boolean;
}
