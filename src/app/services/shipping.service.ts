import { Injectable } from '@angular/core';
import { OrderInfo } from '../models/OrderInfo';
import { ShippingDetails } from '../models/ShippingDetails';
import { OrderShipping } from '../models/OrderShipping';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShippingOrderDetails } from '../models/ShippingOrderDetails';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  orderDetails = new OrderInfo();
  newShippingDetails = new ShippingDetails();
  apiUrl: string = 'http://localhost/OrderManagementService/api';
  constructor(private _httpClient: HttpClient) { }

  SetCurrentOrderInfo(currentOrder: OrderInfo): void {
    this.orderDetails = currentOrder;
  }

  GetOrderInfo(): OrderInfo {
    return this.orderDetails;
  }

  ShipOrders(orders: OrderShipping[], shippingdetails: ShippingDetails): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this._httpClient.post<boolean>(`${this.apiUrl}/ShipOrders/SaveShippingInfo`, { "orderinfo": orders, "shippingdetails": shippingdetails }, options);
  }

  GetShippingDetails() : Observable<ShippingOrderDetails[]>{
    return this._httpClient.get<ShippingOrderDetails[]>(`${this.apiUrl}/ShippingandOrderDetails/GetShippingInfo`);
}
}
