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

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  apiUrl: string = 'http://localhost:28687/api';
  constructor(private _httpClient: HttpClient, private _securityService: SecurityService) { }

  GetOrders(): Observable<Order[]> {
    return this._httpClient.get<Order[]>(`${this.apiUrl}/Orders`);
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
}
