import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  public dummyFunction() {
    console.log("function working")
  }
}
