import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShippingService } from '../services/shipping.service';
import { OrderInfo } from '../models/OrderInfo';
import { AdminDataService } from '../services/admin-data.service';
import { ShippedBy } from '../models/ShippedBy';
import { ShippingMode } from '../models/ShippingMode';
import { ShippingDetails } from '../models/ShippingDetails';

@Component({
  selector: 'app-shippingdetails',
  templateUrl: './shippingdetails.component.html',
  styleUrls: ['./shippingdetails.component.css']
})
export class ShippingdetailsComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _shippingService: ShippingService, private _adminDataService: AdminDataService) { }
  orderdetails = new OrderInfo();
  isAddOrder = false;
  shipppingmodes = new Array<ShippingMode>();
  shippedby = new Array<ShippedBy>();
  orders = new Array<OrderInfo>();
  newShippingDetails = new ShippingDetails();
  searchText = "";
  selectedOrderToAdd = new OrderInfo();
  newOrdersShipped = new Array<OrderInfo>();
  ordersAll = new Array<OrderInfo>();

  ngOnInit() {
    this.CheckForOrder();
    this.GetShippingModes();
    this.GetShippingProviders();
    this.GetOrders();
  }

  ngOnDestroy() {
    this._shippingService.SetCurrentOrderInfo(new OrderInfo());
  }

  CheckForOrder() {
    this.orderdetails = this._shippingService.GetOrderInfo();
    if (this.orderdetails.OrderNo == null) {
      this.isAddOrder = false;
    }
    else {
      this.isAddOrder = true;
      //this.selectedOrderToAdd = this.orderdetails;
      //$('#addOrder').modal('show');
    }
    this.spinner.hide();
  }

  GetShippingModes() {
    this._adminDataService.GetShippingModes().subscribe(
      (data: ShippingMode[]) => {
        this.shipppingmodes = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  GetShippingProviders() {
    this._adminDataService.GetShippingProviders().subscribe(
      (data: ShippedBy[]) => {
        this.shippedby = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  GetOrders() {
    this.spinner.show();
    this._adminDataService.GetOrders(true).subscribe(
      (data: OrderInfo[]) => {
        this.orders = data;
        this.ordersAll = data;
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  SelectOrderToAdd(orderAdd: OrderInfo) {
    this.selectedOrderToAdd = orderAdd;
  }

  AddOrder() {
    this.newOrdersShipped.push(this.selectedOrderToAdd);
    //$('#addOrder').modal('hide');
  }

  RemoveSelectedOrder(orderdata: OrderInfo) {
    this.newOrdersShipped = this.newOrdersShipped.filter(order => order.OrderNo !== orderdata.OrderNo);
  }

  AddOrderClicked(){
    this.selectedOrderToAdd = new OrderInfo();
    this.orders = this.ordersAll.filter(order => !this.newOrdersShipped.includes(order))
  }

}
