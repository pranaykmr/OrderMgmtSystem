import { Component, OnInit } from '@angular/core';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _securityService: SecurityService){}
  title = 'OrderMgmtSystem';

  public currentToken: string = "";
  public isCurrentTokenValid: boolean = false;

  ngOnInit() {
    this.IsUserTokenValid();
  }

  WhenTokenValuePoplated(token: string){
    this.currentToken = token;
    this._securityService.SetUserToken(token);
    this.IsUserTokenValid();
  }
  
  IsUserTokenValid(): void {
    if(this.currentToken == "")
      this.isCurrentTokenValid = false;
    else
    {
      this.ValidateUserToken(this.currentToken);        
    }
  }


  async ValidateUserToken(token: string){
    //let isTokenValid : boolean;
    this.isCurrentTokenValid = <boolean>await this._securityService.ValidateUserToken(token).toPromise();
    //return isTokenValid;
  }

}
