import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { DynamicDashboardComponent } from './pages/dynamic-dashboard/dynamic-dashboard.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { AuthGuardService } from './services/authentication/auth-gurd.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset_password', component: ResetPasswordComponent },
  { path: 'verify_password', component: VerifyPasswordComponent },
  { path: 'confirm_password', component: ConfirmPasswordComponent },
  { path: 'dashboard', component: DynamicDashboardComponent},
  { path: 'product_categories', component: ProductCategoriesComponent }


  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuardService],
  //   component: DynamicDashboardComponent,
  //   data: {
  //     routeName: 'dashboard'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [AuthGuardService],
  //       component: LoginComponent,
  //       data: {
  //         routeName: ''
  //       },
  //     },
  //     {
  //       path: 'reset_password',
  //       canActivate: [AuthGuardService],
  //       component: ResetPasswordComponent,
  //       data: {
  //         routeName: 'reset_password'
  //       },
  //     },
  //     {
  //       path: 'verify_password',
  //       canActivate: [AuthGuardService],
  //       component: VerifyPasswordComponent,
  //       data: {
  //         routeName: 'portcityServiceBookingDetails'
  //       },
  //     },
  //     {
  //       path: 'confirm_password',
  //       canActivate: [AuthGuardService],
  //       component: ConfirmPasswordComponent,
  //       data: {
  //         routeName: 'portcityTvManagement'
  //       },
  //     },
  //     {
  //       path: 'dashboard',
  //       canActivate: [AuthGuardService],
  //       component: DynamicDashboardComponent,
  //       data: {
  //         routeName: 'roleManagement'
  //       },
  //     },
  //     {
  //       path: 'product_categories',
  //       canActivate: [AuthGuardService],
  //       component: ProductCategoriesComponent,
  //       data: {
  //         routeName: 'capacityManager'
  //       },
  //     },
      // {
      //   path: 'dineamic-widget-page-create',
      //   canActivate: [AuthGuardService],
      //   component: DineamicWidgetPageCreateComponent,
      //   data: {
      //     routeName: 'dineamicWidgetPageCreate'
      //   },
      // },
      // {
      //   path: 'pending-request',
      //   canActivate: [AuthGuardService],
      //   component: PendingRequestComponent,
      //   data: {
      //     routeName: 'pendingRequest'
      //   },
      // },
      // {
      //   path: 'request-history',
      //   canActivate: [AuthGuardService],
      //   component: RequestHistoryComponent,
      //   data: {
      //     routeName: 'requestHistory'
      //   },
      // },
      // {
      //   path: 'facility-manager',
      //   canActivate: [AuthGuardService],
      //   component: FacilityComponent,
      //   data: {
      //     routeName: 'facilityManager'
      //   },
      // },
      // {
      //   path: 'approval-manager',
      //   canActivate: [AuthGuardService],
      //   component: ApprovelsManagerComponent,
      //   data: {
      //     routeName: 'approvalManager'
      //   },
      // },
      // {
      //   path: 'audit-trial',
      //   canActivate: [AuthGuardService],
      //   component: AuditTrialComponent,
      //   data: {
      //     routeName: 'auditTrial'
      //   },
      // },
      // {
      //   path: 'gate-manager',
      //   canActivate: [AuthGuardService],
      //   component: GateManagerComponent,
      //   data: {
      //     routeName: 'gateManager'
      //   },
      // },
      // {
      //   path: 'port-city-capacity-manager',
      //   canActivate: [AuthGuardService],
      //   component: PortcityCapacityManagerComponent,
      //   data: {
      //     routeName: 'portCityCapacityManager'
      //   },
      // },
      // {
      //   path: 'que',
      //   canActivate: [AuthGuardService],
      //   component: ServiceProviderBookingDetailsComponent,
      //   data: {
      //     routeName: 'bookingManagement'
      //   },
      // },
      // {
      //   path: 'booking-history',
      //   canActivate: [AuthGuardService],
      //   component: ServiceProviderBookingHistoryComponent,
      //   data: {
      //     routeName: 'bookingHistory'
      //   },
      // },
      // {
      //   path: 'service-providers',
      //   canActivate: [AuthGuardService],
      //   component: ServiceProvidersComponent,
      //   data: {
      //     routeName: 'operators'
      //   },
      // },
      // {
      //   path: 'services',
      //   canActivate: [AuthGuardService],
      //   component: ServicesComponent,
      //   data: {
      //     routeName: 'serviceManagement'
      //   },
      // },
      // {
      //   path: 'user-roles',
      //   canActivate: [AuthGuardService],
      //   component: UserRoleComponent,
      //   data: {
      //     routeName: 'userRoles'
      //   },
      // },
      // {
      //   path: 'users',
      //   canActivate: [AuthGuardService],
      //   component: UsersComponent,
      //   data: {
      //     routeName: 'users'
      //   },
      // },
      // {
      //   path: 'operator-users',
      //   canActivate: [AuthGuardService],
      //   component: OperatorUsersComponent,
      //   data: {
      //     routeName: 'operatorUsers'
      //   },
      // },
      // {
      //   path: 'vip-pass',
      //   canActivate: [AuthGuardService],
      //   component: VipPassComponent,
      //   data: {
      //     routeName: 'vipPass'
      //   },
      // },
      // {
      //   path: 'create-booking',
      //   canActivate: [AuthGuardService],
      //   component: CreateBookingComponent,
      //   data: {
      //     routeName: 'createBooking'
      //   },
      // }
  //   ]
  // },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

  
}
