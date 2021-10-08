import {RequestResponseDetails} from "./request-response-details";

export class MockRest {

  id: bigint;
  operation: string;
  path: string;
  customRests: RequestResponseDetails[];


  constructor(operation: string, path: string, customRests: RequestResponseDetails[]) {
    this.operation = operation;
    this.path = path;
    this.customRests = customRests;
  }
}
