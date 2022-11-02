import { Injectable } from "@angular/core";
import { retry, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LoaderService {
    isloading:Subject<boolean>;
    constructor(){
        this.isloading = new Subject<boolean>();

    }
    // getLoader(){
    //     return this.isloading
    // }
    Show(){
        this.isloading.next(true)
    }
    Hide(){
        this.isloading.next(false)
    }
  }