import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
 {path:'', component:OrderdetailsComponent},
 {path:'admin',component:AdminComponent},
 {path:'orderdetails',component:OrderdetailsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
