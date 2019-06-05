import { Injectable } from '@angular/core';
import { OrderInfo } from '../models/OrderInfo';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  orderDetails = new OrderInfo();
  constructor() { }

  SetCurrentOrderInfo(currentOrder: OrderInfo): void {
    this.orderDetails = currentOrder;
  }

  GetOrderInfo(): OrderInfo {
    return this.orderDetails;
  }
}
