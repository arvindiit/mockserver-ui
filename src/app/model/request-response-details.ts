import {Request} from "./request";
import {Response} from "./response";

export class RequestResponseDetails {
  id: bigint;
  name: string;
  request: Request;
  response: Response;
  isNew: Boolean;


  constructor(name: string, request: Request, response: Response) {
    this.name = name;
    this.request = request;
    this.response = response;
    this.isNew = false;
  }
}
