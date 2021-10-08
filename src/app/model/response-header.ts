export class ResponseHeader{
  name: string;
  value: string;
  isNew: Boolean;

  constructor(private keyValue: string, private valueValue: string) {
    this.name = keyValue;
    this.value = valueValue;
    this.isNew = false;
  }
}
