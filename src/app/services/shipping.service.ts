import { Injectable } from '@angular/core';
import { OrderInfo } from '../models/OrderInfo';
import { ShippingDetails } from '../models/ShippingDetails';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  orderDetails = new OrderInfo();
  newShippingDetails = new ShippingDetails();
  constructor() { }

  SetCurrentOrderInfo(currentOrder: OrderInfo): void {
    this.orderDetails = currentOrder;
  }

  GetOrderInfo(): OrderInfo {
    return this.orderDetails;
  }
}
