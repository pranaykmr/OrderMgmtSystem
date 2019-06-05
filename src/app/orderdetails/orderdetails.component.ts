import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminDataService } from '../services/admin-data.service';
import { OrderInfo } from '../models/OrderInfo';
import { Order } from '../models/Order';
import { NgxSpinnerService } from 'ngx-spinner';
import { Buyer } from '../models/Buyer';
import { Factory } from '../models/Factory';
import { ShippingMode } from '../models/ShippingMode';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as XLSX from 'xlsx';
import { ShippingService } from '../services/shipping.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private _adminDataService: AdminDataService, private spinner: NgxSpinnerService, private _shippingService: ShippingService, private router: Router) { }
  public dataSource = new MatTableDataSource<OrderInfo>();

  ngOnInit() {
    this.showActiveOrdersOnly = true;
    this.spinner.show();
    this.GetOrders();
    this.orders = new Array<OrderInfo>();
    this.buyers = new Array<Buyer>();
    this.NewOrder = new Order();
    this.factories = new Array<Factory>();
    this.shipppingmodes = new Array<ShippingMode>();
    this.GetBuyers();
    this.GetFactory();
    this.GetShippingModes();
    this.isOrderEdit = true;;
    this.SelectedOrderBy = "TotalValue";
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  public orders: OrderInfo[];
  public NewOrder: Order;
  public buyers: Buyer[];;
  public factories: Factory[];
  public shipppingmodes: ShippingMode[];
  public isOrderEdit: boolean;
  public showActiveOrdersOnly: boolean;
  public displayedColumns: string[] = ["OrderNo", "StyleNo", "Quantity",
    "BuyerName", "FactoryName", "PushraseOrderNo", "ShippingModeName", "PriceFOB",
    "FactoryPrice", "TotalValue", "Delivery", "ShipDate", "update", "ship"];
  public SelectedOrderBy: string;

  GetOrders() {
    this.spinner.show();
    this._adminDataService.GetOrders(this.showActiveOrdersOnly).subscribe(
      (data: OrderInfo[]) => {
        this.orders = data;
        this.dataSource.data = data as OrderInfo[];
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  AddEditOrder() {
    if (this.orders.some((item) => item.OrderNo == this.NewOrder.Order_No)) {
      this._adminDataService.EditOrder(this.NewOrder).subscribe((data: any) => {
        this.NewOrder = new Order();
        this.GetOrders();
        $("#addEditOrder").modal('hide');
      },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          $("#addEditOrder").modal('hide');
        })
    }
    else {
      this._adminDataService.AddNewOrder(this.NewOrder).subscribe((data: boolean) => {
        this.NewOrder = new Order();
        this.GetOrders();
        $("#addEditOrder").modal('hide');
      },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          $("#addEditOrder").modal('hide');
        })
    }
  }

  EditOrder(orderdata: OrderInfo) {
    this.isOrderEdit = true;
    this.NewOrder.Order_No = orderdata.OrderNo;
    this.NewOrder.Style_No = orderdata.StyleNo;
    this.NewOrder.BuyerId = orderdata.BuyerId;
    this.NewOrder.Delivery = orderdata.Delivery;
    this.NewOrder.Factory_Id = orderdata.FactoryId;
    this.NewOrder.Factory_Price = orderdata.FactoryPrice;
    this.NewOrder.Price_FOB = orderdata.PriceFOB;
    this.NewOrder.Purchase_Order_No = orderdata.PushraseOrderNo;
    this.NewOrder.Quantity = orderdata.Quantity;
    this.NewOrder.Ship_Date = orderdata.ShipDate;
    this.NewOrder.ShippingMode_Id = orderdata.ShippingModeId;
    this.NewOrder.Style_No = orderdata.StyleNo;
    this.NewOrder.Total_Value = orderdata.TotalValue;
  }

  AddOrder() {
    this.NewOrder = new Order();
    this.isOrderEdit = false;
  }

  GetBuyers() {
    this._adminDataService.GetBuyers().subscribe(
      (data: Buyer[]) => {
        this.buyers = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  GetFactory() {
    this._adminDataService.GetFactory().subscribe(
      (data: Factory[]) => {
        this.factories = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
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

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Data.xlsx');
  }

  toggelActiveOrders() {
    this.showActiveOrdersOnly = !this.showActiveOrdersOnly;
    this.GetOrders();
  }

  ShipOrder(data: OrderInfo) {
    this.spinner.show();
    this._shippingService.SetCurrentOrderInfo(data);
    this.router.navigate(['/shippingdetails']);
  }
}
