import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {AuthService}from "./Auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private auth:AuthService) { }


  postTrainee(data:User){
    console.log(data)
    return this.http.post("http://localhost:8000/api/v1/users/register",data)
  }

  getTrainee(){
    return this.http.get<User[]>("http://localhost:8000/api/v1/users/client")
  }

  updateTrainee(data:User){
    return this.http.patch("http://localhost:8000/api/v1/users/update",data)
  }

  deleteTrainee(email:string){
    return this.http.delete("http://localhost:8000/api/v1/users/delete",{
      body: {
        "email": email
      }
    })
  }

}
