export class RequestHeader {

  id: bigint;
  name: string;
  value: string;
  isNew: Boolean;

  constructor(keyValue: string, valueValue: string) {
    this.name = keyValue;
    this.value = valueValue;
    this.isNew = false;
  }
}
