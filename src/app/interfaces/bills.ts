export interface IBill {
  billNumber: any;
  consumerId: string;
  paymentStatus: number;
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
