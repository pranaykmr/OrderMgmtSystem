import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShippingService } from '../services/shipping.service';
import { OrderInfo } from '../models/OrderInfo';
import { AdminDataService } from '../services/admin-data.service';
import { ShippedBy } from '../models/ShippedBy';
import { ShippingMode } from '../models/ShippingMode';
import { ShippingDetails } from '../models/ShippingDetails';
import { OrderShipping } from '../models/OrderShipping';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as XLSX from 'xlsx';
import { ShippingOrderDetails } from '../models/ShippingOrderDetails';

@Component({
  selector: 'app-shippingdetails',
  templateUrl: './shippingdetails.component.html',
  styleUrls: ['./shippingdetails.component.css']
})
export class ShippingdetailsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private spinner: NgxSpinnerService, private _shippingService: ShippingService, private _adminDataService: AdminDataService) { }
  public dataSource = new MatTableDataSource<ShippingDetails>();
  orderdetails = new OrderInfo();
  isAddOrder = false;
  shipppingmodes = new Array<ShippingMode>();
  shippedby = new Array<ShippedBy>();
  orders = new Array<OrderInfo>();
  newShippingDetails = new ShippingDetails();
  searchText = "";
  selectedOrderToAdd = new OrderInfo();
  newOrdersShipped = new Array<OrderShipping>();
  ordersAll = new Array<OrderInfo>();
  activeTab = "shippingdetails";
  isOrderFullyShipped = true;
  orderQuantity = 0;
  orderWeight = 0;
  shippingdetails = new Array<ShippingDetails>();
  displayedColumns: string[] = ["Order_No", "PO_No", "Invoice_No",
    "Shipping_Date", "Weight", "ShippedBy", "BuyerName", "FactoryName", "ShippingMode", "Advised",
    "Consigned_To", "Quantity"];

  ngOnInit() {
    this.CheckForOrder();
    this.GetShippingModes();
    this.GetShippingProviders();
    this.GetOrders();
    this.GetShippingDetails();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.selectedOrderToAdd = this.orderdetails;
      this.activeTab = "shiporder";
      $('#addOrder').modal('show');
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
    this.newOrdersShipped.push(this.MapOrderToAdd(this.selectedOrderToAdd, this.isOrderFullyShipped));
  }

  MapOrderToAdd(selectedOrderToAdd: OrderInfo, isOrderFullyShipped: boolean): OrderShipping {
    var orderToAdd = new OrderShipping();
    orderToAdd.FactoryName = selectedOrderToAdd.FactoryName;
    orderToAdd.BuyerId = selectedOrderToAdd.BuyerId;
    orderToAdd.BuyerName = selectedOrderToAdd.BuyerName;
    orderToAdd.Delivery = selectedOrderToAdd.Delivery;
    orderToAdd.FactoryId = selectedOrderToAdd.FactoryId;
    orderToAdd.FactoryPrice = selectedOrderToAdd.FactoryPrice;
    orderToAdd.OrderNo = selectedOrderToAdd.OrderNo;
    orderToAdd.PriceFOB = selectedOrderToAdd.PriceFOB;
    orderToAdd.PushraseOrderNo = selectedOrderToAdd.PushraseOrderNo;
    if (!isOrderFullyShipped)
      orderToAdd.Quantity = this.orderQuantity;
    else
      orderToAdd.Quantity = selectedOrderToAdd.Quantity;
    orderToAdd.ShipDate = selectedOrderToAdd.ShipDate;
    orderToAdd.ShippingModeId = selectedOrderToAdd.ShippingModeId;
    orderToAdd.ShippingModeName = selectedOrderToAdd.ShippingModeName;
    orderToAdd.StyleNo = selectedOrderToAdd.StyleNo;
    orderToAdd.TotalValue = selectedOrderToAdd.TotalValue;
    orderToAdd.IsFullyShipped = isOrderFullyShipped;
    return orderToAdd;
  }

  RemoveSelectedOrder(orderdata: OrderInfo) {
    this.newOrdersShipped = this.newOrdersShipped.filter(order => order.OrderNo !== orderdata.OrderNo);
  }

  AddOrderClicked() {
    this.selectedOrderToAdd = new OrderInfo();
    this.orderWeight = 0;
    this.orderQuantity = 0;
    this.isOrderFullyShipped = true;
    this.orders = this.ordersAll.filter(order => !this.newOrdersShipped.some(no => no.OrderNo == order.OrderNo));
  }

  Ship() {
    //this.spinner.show();
    this._shippingService.ShipOrders(this.newOrdersShipped, this.newShippingDetails).subscribe(
      (data: boolean) => {
        this.GetShippingDetails();
        this.activeTab = "shippingdetails";
        this.isAddOrder = false;
        this.newShippingDetails = new ShippingDetails();
        this.newOrdersShipped = new Array<OrderShipping>();
        //this.spinner.hide();
      },
      (error: any) => {
        this.newShippingDetails = new ShippingDetails();
        this.newOrdersShipped = new Array<OrderShipping>();
        console.log(error);
        //this.spinner.hide();
      }
    )
  }

  GetShippingDetails() {
    this.spinner.show();
    this._shippingService.GetShippingDetails().subscribe(
      (data: ShippingOrderDetails[]) => {
        this.shippingdetails = data;
        this.dataSource.data = data as ShippingDetails[];
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ShippingData.xlsx');
  }


}
