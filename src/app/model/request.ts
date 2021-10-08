import {RequestHeader} from "./request-header";

export class Request{
  id: bigint;
  requestBody: string;
  requestHeaders: RequestHeader[];
  isNew: Boolean;

  constructor(requestBody: string, requestHeaders: RequestHeader[]) {
    this.requestBody = requestBody;
    this.requestHeaders = requestHeaders;
    this.isNew = false;
  }
}
