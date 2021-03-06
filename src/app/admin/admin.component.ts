import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminDataService } from '../services/admin-data.service';
import { Order } from '../models/Order';
import { Buyer } from '../models/Buyer';
import { Factory } from '../models/Factory';
import { Users } from '../models/Users';
import { ShippingMode } from '../models/ShippingMode';
import { SecurityService } from '../services/security.service';
import { Guid } from "guid-typescript";
import { OrderInfo } from '../models/OrderInfo';
import { DatePipe } from '@angular/common';
import { ShippedBy } from '../models/ShippedBy';
//import * as $ from 'jquery';
//import 'bootstrap';
//declare var $ : any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe]
})
export class AdminComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _adminDataService: AdminDataService, private _securityService: SecurityService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.orders = new Array<OrderInfo>();
    this.buyers = new Array<Buyer>();
    this.factories = new Array<Factory>();
    this.users = new Array<Users>();
    this.shipppingmodes = new Array<ShippingMode>();
    this.newPassword = "";
    this.newPasswordRepeat = "";
    this.ChangePwdUser = new Users();
    this.AddNewUserData = new Users();
    this.FactoryEditData = new Factory();
    this.NewShippingMode = new ShippingMode();
    this.BuyerEditData = new Buyer();
    this.NewOrder = new Order();
    this.shippedby = new Array<ShippedBy>();
    this.GetUsers();
    this.GetOrders();
    this.GetBuyers();
    this.GetFactory();
    this.GetShippingModes();
    this.GetShippingProviders();
    this.isOrderEdit = true;
    this.addEditShippedBy = new ShippedBy();
  }

  public orders: OrderInfo[];
  public buyers: Buyer[];
  public factories: Factory[];
  public users: Users[];
  public shipppingmodes: ShippingMode[];
  public newPassword: string;
  public newPasswordRepeat: string;
  public ChangePwdUser: Users;
  public AddNewUserData: Users;
  public FactoryEditData: Factory;
  public NewShippingMode: ShippingMode;
  public BuyerEditData: Buyer;
  public NewOrder: Order;
  public isOrderEdit: boolean;
  public shippedby: ShippedBy[];
  public addEditShippedBy: ShippedBy;

  GetOrders() {
    this._adminDataService.GetOrders(false).subscribe(
      (data: OrderInfo[]) => {
        this.orders = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
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

  GetUsers() {
    this._adminDataService.GetUsers().subscribe(
      (data: Users[]) => {
        this.users = data;
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

  DeleteResource(cons: string) {
    this._adminDataService.DeleteUser(cons).subscribe(
      (data: boolean) => {
        if (data)
          this.GetUsers();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  DeleteShippingMode(modeId: string) {

  }

  EditFactory(factoryObj: Factory) {
    this.FactoryEditData = factoryObj;
  }

  EditAddFactoryToServer() {
    if (this.FactoryEditData.Factory_Id == "") {
      this.FactoryEditData.Factory_Id = Guid.create().toString();
      this._adminDataService.AddFactory(this.FactoryEditData).subscribe(
        (data: boolean) => {
          if (data)
            this.GetFactory();
          this.FactoryEditData = new Factory();
          $("#addEditFactory").modal('hide');
        },
        (error: any) => {
          console.log(error);
          this.FactoryEditData = new Factory();
          $("#addEditFactory").modal('hide');
        }
      );
    }
    else {
      this._adminDataService.EditFactory(this.FactoryEditData).subscribe(
        (data: void) => {
          this.GetFactory();
          this.FactoryEditData = new Factory();
          $("#addEditFactory").modal('hide');
        },
        (error: any) => {
          console.log(error);
          this.FactoryEditData = new Factory();
          $("#addEditFactory").modal('hide');
        }
      );
    }
  }

  AddFactory() {
    this.FactoryEditData = new Factory();
  }

  ChangePassword(udata: Users) {
    this.ChangePwdUser = udata;
    //$("#changePwd").modal('show');
  }

  ChangePwd() {
    if (this.newPassword == this.newPasswordRepeat) {
      this._adminDataService.UpdatePassword(this.newPassword, this.ChangePwdUser.UserId).subscribe(
        (data: boolean) => {
          if (data)
            this.GetUsers();
          this.newPassword = "";
          this.newPasswordRepeat = "";
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          this.newPassword = "";
          this.newPasswordRepeat = "";
        }
      )
    }
    else {
      alert('Passwords Do Not Match');
    }
  }

  hideModal() {
    $("#changePwd").modal('hide');
  }

  AddNewUser() {
    $("#addUser").modal('show');
  }

  AddNewUserToServer() {
    this.AddNewUserData.ActiveToken = null;
    this.AddNewUserData.IsActive = false;
    this.AddNewUserData.IsDeleted = false;
    this.AddNewUserData.UserId = Guid.create().toString();
    this._adminDataService.AddNewUser(this.AddNewUserData).subscribe((data: void) => {
      this.AddNewUserData = new Users();
      this.GetUsers();
      $("#addUser").modal('hide');
    },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        $("#addUser").modal('hide');
      })
  }

  EditBuyer(modedata: Buyer) {
    this.BuyerEditData = modedata;
  }

  AddBuyer() {
    this.BuyerEditData = new Buyer();
  }

  AddShippingMode() {
    this.NewShippingMode = new ShippingMode();
  }

  AddShippingModeToServer() {
    this.NewShippingMode.ShippingMode_Id = Guid.create().toString();
    this._adminDataService.AddShippingMode(this.NewShippingMode).subscribe((data: boolean) => {
      this.NewShippingMode = new ShippingMode();
      this.GetShippingModes();
      $("#addShippingMode").modal('hide');
    },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        $("#addShippingMode").modal('hide');
      })
  }

  EditAddBuyerToServer() {
    if (this.BuyerEditData.BuyerId == "") {
      this.BuyerEditData.BuyerId = Guid.create().toString();
      this._adminDataService.AddNewBuyer(this.BuyerEditData).subscribe((data: boolean) => {
        this.BuyerEditData = new Buyer();
        this.GetBuyers();
        $("#addEditBuyer").modal('hide');
      },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          $("#addEditBuyer").modal('hide');
        })
    }
    else {
      this._adminDataService.EditBuyer(this.BuyerEditData).subscribe((data: void) => {
        this.BuyerEditData = new Buyer();
        this.GetBuyers();
        $("#addEditBuyer").modal('hide');
      },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          $("#addEditBuyer").modal('hide');
        })
    }
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

  EditAddShipperToServer(){
    if (this.addEditShippedBy.ShipperId != "") {
      this._adminDataService.EditShipper(this.addEditShippedBy).subscribe((data: any) => {
        this.addEditShippedBy = new ShippedBy();
        this.GetShippingProviders();
        $("#addEditShipper").modal('hide');
      },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          $("#addEditShipper").modal('hide');
        })
    }
    else {
      this.addEditShippedBy.ShipperId = Guid.create().toString();
      this._adminDataService.AddNewShipper(this.addEditShippedBy).subscribe((data: boolean) => {
        this.addEditShippedBy = new ShippedBy();
        this.GetShippingProviders();
        $("#addEditShipper").modal('hide');
      },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          $("#addEditShipper").modal('hide');
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

  GetDateString(newdate: Date) {
    this.datePipe.transform(newdate, "yyyy-MM-dd");
  }

  AddOrder() {
    this.NewOrder = new Order();
    this.isOrderEdit = false;
  }

  EditShipper(shippedby: ShippedBy) {
    this.addEditShippedBy = shippedby;
  }
  AddShipper() {
    this.addEditShippedBy = new ShippedBy();
  }

}
