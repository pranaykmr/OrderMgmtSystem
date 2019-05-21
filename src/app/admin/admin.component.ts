import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminDataService } from '../services/admin-data.service';
import { Order } from '../models/Order';
import { Buyer } from '../models/Buyer';
import { Factory } from '../models/Factory';
import { Users } from '../models/Users';
import { ShippingMode } from '../models/ShippingMode';
//import * as $ from 'jquery';
//import 'bootstrap';
//declare var $ : any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _adminDataService: AdminDataService) { }

  ngOnInit() {
  this.orders=new Array<Order>();
  this.buyers=new Array<Buyer>();
  this.factories=new Array<Factory>();
  this.users=new Array<Users>();
  this.shipppingmodes=new Array<ShippingMode>();
  this.GetUsers();
  }

  public orders: Order[];
  public buyers: Buyer[];
  public factories: Factory[];
  public users:Users[];
  public shipppingmodes:ShippingMode[];

  GetOrders(){
    this._adminDataService.GetOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      }
    )
  }

  GetBuyers(){
    this._adminDataService.GetBuyers().subscribe(
      (data: Buyer[]) => {
        this.buyers = data;
      }
    )
  }

  GetFactory(){
    this._adminDataService.GetFactory().subscribe(
      (data: Factory[]) => {
        this.factories = data;
      }
    )
  }

  GetUsers(){
    this._adminDataService.GetUsers().subscribe(
      (data: Users[]) => {
        this.users = data;
      },
      (error: any)=>{
        console.log(error);
      }
    )
  }

  GetShippingModes(){
    this._adminDataService.GetShippingModes().subscribe(
      (data: ShippingMode[]) => {
        this.shipppingmodes = data;
      }
    )
  }

    DeleteResource(cons: string){
    this._adminDataService.DeleteUser(cons).subscribe(
      (data: boolean) => {
        if(data)
          this.GetUsers();
      },
      (error: any)=>{
        console.log(error);
        this.spinner.hide();
      }
    )
  }

  ChangePassword(udata : Users){
      //$("#myModal").modal('show');
  }
}
