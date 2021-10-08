import {ResponseHeader} from "./response-header";

export class Response {
  id: bigint
  status: bigint;
  responseBody: string;
  responseHeaders: ResponseHeader[];
  isNew: Boolean;


  constructor(status: bigint, responseBody: string, responseHeaders: ResponseHeader[]) {
    this.status = status;
    this.responseBody = responseBody;
    this.responseHeaders = responseHeaders;
    this.isNew = false;
  }
}
