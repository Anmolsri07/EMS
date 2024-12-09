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
import { LoginComponent } from './pages/login/login.component';
import { unprotectedGuard } from './guard/unprotected.guard';
import { protectedGuard } from './guard/protected.guard';


import { ViewComplaintHistoryComponent } from './pages/view-complaint-history/view-complaint-history.component';
import { RemoveConsumerComponentComponent } from './pages/remove-consumer-component/remove-consumer-component.component';
import { ViewCustomersComplaintsAdminComponent } from './pages/view-customers-complaints-admin/view-customers-complaints-admin.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { userProtectedGuard } from './guard/user-protected.guard';
import { adminProtectedGuard } from './guard/admin-protected.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [unprotectedGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'customer-registration',
    component: CustomerRegistrationComponent,
    canActivate: [unprotectedGuard],
  },
  {
    path: 'view-bills',
    component: ViewBillsComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'view-bill-summary',
    component: ViewBillSummaryComponent,
    canActivate: [userProtectedGuard],
  },
  {
    path: 'pay-bills/:billNumber/:amount',
    component: PayBillComponent,
    canActivate: [userProtectedGuard],
  },
  {
    path: 'bill-history',
    component: BillHistoryComponent,
    canActivate: [userProtectedGuard],
  },
  {
    path: 'registration-complaint',
    component: RegisterComplaintsComponent,
    canActivate: [userProtectedGuard],
  },
  {
    path: 'view-complaint-status',
    component: ViewComplaintsComponent,
    canActivate: [userProtectedGuard],
  },
  {
    path: 'view-customer-complaint',
    component: ViewCustomersComplaintsAdminComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'view-complaint-history',
    component: ViewComplaintHistoryComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'add-customer',
    component: AddCustomersComponent,
    canActivate: [adminProtectedGuard],
  },
  {
    path: 'add-consumer',
    component: AddConsumerComponent,
    canActivate: [adminProtectedGuard],
  },
  {
    path: 'update-consumer',
    component: UpdateConsumerComponent,
    canActivate: [adminProtectedGuard],
  },
  {
    path: 'remove-consumer',
    component: RemoveConsumerComponentComponent,
    canActivate: [adminProtectedGuard],
  },
  {
    path: 'add-bills',
    component: AddBillComponent,
    canActivate: [adminProtectedGuard],
  },
  {
    path: 'view-bills',
    component: ViewBillsComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unprotectedGuard],
  },
];
