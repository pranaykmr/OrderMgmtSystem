import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SecurityService } from './security.service';
import { Order } from '../models/Order';
import { Buyer } from '../models/Buyer';
import { Factory } from '../models/Factory';
import { Users } from '../models/Users';
import { ShippingMode } from '../models/ShippingMode';
import { OrderInfo } from '../models/OrderInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  apiUrl: string = 'http://localhost:28687/api';
  constructor(private _httpClient: HttpClient, private _securityService: SecurityService) { }

  GetOrders(): Observable<OrderInfo[]> {
    return this._httpClient.get<OrderInfo[]>(`${this.apiUrl}/OrderInfo/GetOrderInfo?token=` + this._securityService.GetUserToken());
  }

  GetBuyers(): Observable<Buyer[]> {
    return this._httpClient.get<Buyer[]>(`${this.apiUrl}/Buyers`);
  }

  GetFactory(): Observable<Factory[]> {
    return this._httpClient.get<Factory[]>(`${this.apiUrl}/Factories`);
  }

  GetUsers(): Observable<Users[]> {
    return this._httpClient.get<Users[]>(`${this.apiUrl}/Security_User`);
  }

  GetShippingModes(): Observable<ShippingMode[]> {
    return this._httpClient.get<ShippingMode[]>(`${this.apiUrl}/ShippingModes`);
  }

  DeleteUser(userId: string): Observable<Boolean> {
    return this._httpClient.get<Boolean>(`${this.apiUrl}/login/DeleteUser?userId=` + userId);
  }

  UpdatePassword(newPassword: string, userId: string): Observable<Boolean> {
    return this._httpClient.get<Boolean>(`${this.apiUrl}/login/UpdatePassword?newPassword=` + newPassword + '&userId=' + userId);
  }

  AddNewUser(newUser: Users): Observable<void> {
    //return this._httpClient.get<Boolean>(`${this.apiUrl}/login/UpdatePassword?newPassword=`);
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.post<void>(`${this.apiUrl}/Security_User`, newUser, options);
  }

  AddFactory(newFactory: Factory): Observable<boolean> {
    //return this._httpClient.get<Boolean>(`${this.apiUrl}/login/UpdatePassword?newPassword=`);
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.post<boolean>(`${this.apiUrl}/Factories`, newFactory, options);
  }

  EditFactory(newFactory: Factory): Observable<void> {
    //return this._httpClient.get<Boolean>(`${this.apiUrl}/login/UpdatePassword?newPassword=`);
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.put<void>(`${this.apiUrl}/Factories/${newFactory.Factory_Id}`,newFactory);
  }

  AddShippingMode(newShippingMode: ShippingMode): Observable<boolean> {
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.post<boolean>(`${this.apiUrl}/ShippingModes`, newShippingMode, options);
  }


  AddNewBuyer(newBuyer: Buyer): Observable<boolean> {
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.post<boolean>(`${this.apiUrl}/Buyers`, newBuyer, options);
  }

  EditBuyer(newBuyer: Buyer): Observable<void> {
    //return this._httpClient.get<Boolean>(`${this.apiUrl}/login/UpdatePassword?newPassword=`);
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.put<void>(`${this.apiUrl}/Buyers/${newBuyer.BuyerId}`,newBuyer);
  }

  AddNewOrder(newOrder: Order): Observable<boolean> {
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.post<boolean>(`${this.apiUrl}/Orders`, newOrder, options);
  }

  EditOrder(newOrder: Order): Observable<void> {
    //return this._httpClient.get<Boolean>(`${this.apiUrl}/login/UpdatePassword?newPassword=`);
    let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        let options = { headers: headers };
        return this._httpClient.put<void>(`${this.apiUrl}/Orders/${newOrder.Order_No}`,newOrder);
  }
}
