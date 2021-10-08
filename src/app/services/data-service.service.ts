import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  public editDataDetails: any = [];
  private tenantSource = new  BehaviorSubject(this.editDataDetails);
  currentTenant = this.tenantSource.asObservable();
  changeTenant(tenant: string){
    this.tenantSource.next(tenant);
  }

}
