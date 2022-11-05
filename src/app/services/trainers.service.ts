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
    console.log(data)
    return this.http.post("http://localhost:8000/api/v1/users/register",data)
  }
  getTrainer(){
    return this.http.get<User[]>("http://localhost:8000/api/v1/users/trainer")
  }
  updateTrainer(data:User){
    return this.http.put<User>("http://localhost:8000/api/v1/users/update",data)
  }
  deleteTrainer(email:string){
    return this.http.delete<User>("http://localhost:8000/api/v1/users/delete",{
      body: {
        "email": email
      }
    })
  }
}
