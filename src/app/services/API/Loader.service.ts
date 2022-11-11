import { Injectable } from "@angular/core";
import { BehaviorSubject, retry, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LoaderService {
    isloading= new BehaviorSubject<boolean>(true);
    constructor(){
    }
    getLoader(){
        return this.isloading.asObservable()
    }
    Show(){
        this.isloading.next(true)
    }
    Hide(){
        this.isloading.next(false)
    }
  }