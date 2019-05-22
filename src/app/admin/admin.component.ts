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
//import * as $ from 'jquery';
//import 'bootstrap';
//declare var $ : any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _adminDataService: AdminDataService, private _securityService: SecurityService) { }

  ngOnInit() {
    this.orders = new Array<Order>();
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
    this.GetUsers();
    this.GetOrders();
    this.GetBuyers();
    this.GetFactory();
    this.GetShippingModes();
  }

  public orders: Order[];
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

  GetOrders() {
    this._adminDataService.GetOrders().subscribe(
      (data: Order[]) => {
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
  
}
