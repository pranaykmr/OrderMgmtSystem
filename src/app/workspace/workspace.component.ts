import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private _securityService: SecurityService, private _router: Router, private spinner:NgxSpinnerService) { }

  @Input()
  currentToken: string = "";

  @Output()
  onTokenValuePopulate : EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  onLogout() : void{
    this.spinner.show();
    this._securityService.DoLogout(this.currentToken).subscribe(
      (data: void) =>{
        this.onTokenValuePopulate.emit("");
        this.spinner.hide();
        //this._router.navigateByUrl("");
      },
      (error: any)=>{
        console.log(error);
        this.spinner.hide();
      }
    );  
  }

}
