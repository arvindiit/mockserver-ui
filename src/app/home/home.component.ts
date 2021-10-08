import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {RestComponent} from "../rest/rest.component";
import {SoapComponent} from "../soap/soap.component";
import {DataServiceService} from "../services/data-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(RestComponent) restComponent;
  @ViewChild(SoapComponent) soapComponent;

  constructor(private http: HttpClient,
              private router: Router,
              private dataService: DataServiceService) {
    //fetchTenants();
  }

  tenants: string[] = ['Jugglers', 'Strugglers', 'Makers'];
  operations: string[];
  selectedTenant: string;

  fetchTenants(){
    this.http.get<string[]>('https://mockserver-backend.azurewebsites.net/fetchTenants')
      .toPromise()
      .then(tenants => this.tenants = tenants);
  }

  loadOperations(tenant){
    this.selectedTenant = tenant;
    this.operations = ['Rest', 'SOAP'];
    event.preventDefault();
  }

  loadPage(operation){
    if(operation === 'Rest'){
      this.dataService.changeTenant(this.selectedTenant);
      this.router.navigate(['/rest']);
    }
    event.preventDefault();
  }

  ngOnInit(): void {
  }

}
