import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  userToken = '';
  apiUrl: string = 'http://localhost:28687/api/';
  //apiUrl : string = 'http://localhost:9349/api';
  constructor(private _httpClient: HttpClient) { }

  DoLogin(userId: string, pwd: string): Observable<string> {
    return this._httpClient.get<string>(`${this.apiUrl}/login/GetLogonTheUser?username=`+userId+'&password='+pwd);
  }

  ValidateUserToken(token: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.apiUrl}/Security_UserSession/5?id=${token}`);
  }

  DoLogout(token: string): Observable<void> {
    this.userToken="";
    return this._httpClient.put<void>(`${this.apiUrl}/login/PutLogoutUserSession`,token);
  }

  SetUserToken(token: string) {
    this.userToken = token;
  }

  GetUserToken() {
    return this.userToken;
  }
}
