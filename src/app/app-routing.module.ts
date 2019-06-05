import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminComponent } from './admin/admin.component';
import { ShippingdetailsComponent } from './shippingdetails/shippingdetails.component';

const routes: Routes = [
  { path: '', component: OrderdetailsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'orderdetails', component: OrderdetailsComponent },
  { path: 'shippingdetails', component: ShippingdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
