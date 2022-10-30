import { HttpClient } from '@angular/common/http';
import { ImplicitReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {User} from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  constructor(private http: HttpClient) { }
  postTrainer(data:User){
    return this.http.post<User>("http://localhost:3000/trainersList/",data)
  }
  getTrainer(){
    return this.http.get<User[]>("http://localhost:3000/trainersList")
  }
  updateTrainer(data:User){
    return this.http.put<User>("http://localhost:3000/trainersList/",data)
  }
  deleteTrainer(data:any){
    return this.http.delete<User>("http://localhost:3000/"+data)
  }
}
