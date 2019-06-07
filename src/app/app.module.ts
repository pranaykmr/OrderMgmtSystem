import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminComponent } from './admin/admin.component';
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, MatFormFieldModule, MatInputModule, MatGridListModule } from '@angular/material';
import { ShippingdetailsComponent } from './shippingdetails/shippingdetails.component';
import { FilterPipe } from './filter.pipe'
import { AdminDataService } from './services/admin-data.service';
import { ShippingService } from './services/shipping.service';
import { SecurityService } from './services/security.service';

//import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceComponent,
    OrderdetailsComponent,
    AdminComponent,
    ShippingdetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    NgPipesModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ],
  exports: [
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ],
  providers: [
    NgxSpinnerService,
    ShippingService,
    AdminDataService,
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
