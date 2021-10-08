import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataServiceService} from "../services/data-service.service";
import {RequestResponseDetails} from "../model/request-response-details";
import {RequestHeader} from "../model/request-header";
import {ResponseHeader} from "../model/response-header";
import {Request} from "../model/request";
import {Response} from "../model/response";
import {BigInteger} from "@angular/compiler/src/i18n/big_integer";
import {MockRest} from "../model/mock-rest";

export class EndpointDetails{
  path: string;
  operation: string;
  isNew: boolean;

  constructor(private pathName: string, private operationName: string) {
    this.operation = operationName;
    this.path = pathName;
    this.isNew = false;
  }
}

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

  isDisabled: Boolean = true;
  tenant: string;
  endpointsDetails: EndpointDetails[];
  mockRest: MockRest;
  currentRequestResponseDetail: RequestResponseDetails;
  selectedEndPoint: EndpointDetails;
  requestHeader: RequestHeader;
  responseHeader: ResponseHeader;
  constructor(private http: HttpClient,
              private router: Router,
              private dataService: DataServiceService) {
    this.dataService.currentTenant.subscribe(
      tenant => this.tenant = tenant
    )
    this.http.get<EndpointDetails[]>('https://mockserver-backend.azurewebsites.net/mock/fetchEndpointDetails',
      {params: new HttpParams().set('tenant', this.tenant)})
      .toPromise()
      .then(endpointsDetails => this.endpointsDetails = endpointsDetails);

  }

  fetchDetails(endpointDetails: EndpointDetails){
    this.http.get<MockRest>('https://mockserver-backend.azurewebsites.net/mock/fetchMockDetails',
      {params: new HttpParams().set('tenant', this.tenant)
          .set('path', endpointDetails.path)
          .set('operation', endpointDetails.operation)})
      .toPromise()
      .then(mockRest => this.mockRest = mockRest);
    this.selectedEndPoint = endpointDetails;
    event.preventDefault();
  }

  setRequestResponseDetails(requestResponseDetail: RequestResponseDetails){
    this.currentRequestResponseDetail = requestResponseDetail;
    event.preventDefault();
  }

  add(row){
    this.isDisabled = false;
    if(row === 'requestHeader') {
      this.requestHeader = new RequestHeader('', '');
      this.requestHeader.isNew = true;
      this.currentRequestResponseDetail.request.requestHeaders.push(this.requestHeader);
    }

    if(row === 'responseHeader') {
      this.responseHeader = new ResponseHeader('', '');
      this.responseHeader.isNew = true;
      this.currentRequestResponseDetail.response.responseHeaders.push(this.responseHeader);
    }

    if(row === 'item') {
     this.addItem();
    }
    if(row === 'endpoint'){
      this.mockRest = new MockRest('GET','', [this.createItem()]);
      let newEndpoint = new EndpointDetails(' ', 'GET');
      newEndpoint.isNew = true;
      if(this.endpointsDetails === undefined){
        this.endpointsDetails = [newEndpoint];
      }else {
        this.endpointsDetails.push(newEndpoint)
      }
      this.selectedEndPoint = newEndpoint;
      this.selectedEndPoint.operation = 'GET'
    }
    event.preventDefault();
  }

  addItem(){
    this.mockRest.customRests.push(this.createItem());
  }

  createItem(){
    let newRequestHeader = new RequestHeader('', '');
    let newResponseHeader = new ResponseHeader('', '');
    newRequestHeader.isNew = true;
    newResponseHeader.isNew = true;
    let requestHeaders = [newRequestHeader];
    let responseHeaders = [newResponseHeader];

    let request = new Request('', requestHeaders);
    let response = new Response(null,'',responseHeaders)
    request.isNew = true;
    response.isNew = true;

    this.currentRequestResponseDetail = new RequestResponseDetails('', request, response);
    this.currentRequestResponseDetail.isNew = true;
    return this.currentRequestResponseDetail;
  }

  saveChanges(){
    //alert("hello");
    this.http.post<any>('https://mockserver-backend.azurewebsites.net/mock/createMock?tenant=' + this.tenant, this.mockRest)
      .toPromise()
      .then(mockRest => this.mockRest = mockRest);
    window.location.reload();

  }

  deleteEndPoint(row){
    this.http.delete<void>('https://mockserver-backend.azurewebsites.net/mock/deleteMock',
      {params: new HttpParams().set('tenant', this.tenant)
          .set('path', row.path)
          .set('operation', row.operation)})
      .toPromise()
      .then();

    window.location.reload()
  }
  ngOnInit(): void {
  }

}
