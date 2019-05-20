import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  userToken = '';
  apiUrl: string = 'https://rsurcmgmgtwapi2.azurewebsites.net/api';
  //apiUrl : string = 'http://localhost:9349/api';
  constructor(private _httpClient: HttpClient) { }

  DoLogin(userId: string, pwd: string): Observable<string> {
    return this._httpClient.post<string>(`${this.apiUrl}/security`, { userId, pwd }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  ValidateUserToken(token: string): Observable<boolean> {
    return this._httpClient.get<boolean>(`${this.apiUrl}/security?token=${token}`);
  }

  DoLogout(token: string): Observable<void> {
    this.userToken="";
    return this._httpClient.get<void>(`${this.apiUrl}/security?token=${token}&isLogout=true`);
  }

  SetUserToken(token: string) {
    this.userToken = token;
  }

  GetUserToken() {
    return this.userToken;
  }
}
