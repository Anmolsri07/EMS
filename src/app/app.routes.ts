import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { ViewBillsComponent } from './pages/view-bills/view-bills.component';
import { ViewBillSummaryComponent } from './pages/view-bill-summary/view-bill-summary.component';
import { PayBillComponent } from './pages/pay-bill/pay-bill.component';
import { RegisterComplaintsComponent } from './pages/register-complaints/register-complaints.component';
import { ViewComplaintsComponent } from './pages/view-complaints/view-complaints.component';
import { AddCustomersComponent } from './pages/add-customers/add-customers.component';
import { AddConsumerComponent } from './pages/add-consumer/add-consumer.component';
import { UpdateConsumerComponent } from './pages/update-consumer/update-consumer.component';
import { AddBillComponent } from './pages/add-bill/add-bill.component';
import { BillHistoryComponent } from './pages/bill-history/bill-history.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'customer-registration',
    component: CustomerRegistrationComponent
  },
  {
    path: 'view-bills',
    component: ViewBillsComponent
  },
  {
    path: 'view-bill-summary',
    component: ViewBillSummaryComponent
  },
  {
    path: 'pay-bills',
    component: PayBillComponent
  },
  {
    path: 'bill-history',
    component: BillHistoryComponent
  },
  {
    path: 'registration-complaint',
    component: RegisterComplaintsComponent
  },
  {
    path: 'view-customer-complaints',
    component: ViewComplaintsComponent
  },
  {
    path: 'add-customer',
    component: AddCustomersComponent
  },
  {
    path: 'add-consumer',
    component: AddConsumerComponent
  },
  {
    path: 'update-consumer',
    component: UpdateConsumerComponent
  },
  {
    path: 'add-bills',
    component: AddBillComponent
  },
  {
    path: 'view-bills',
    component: ViewBillsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
