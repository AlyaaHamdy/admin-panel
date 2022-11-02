import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  postTrainee(data:User){
    return this.http.post<any>("http://localhost:8000/api/v1/users/register",data)
  }

  getTrainee(){
    return this.http.get<User[]>("http://localhost:8000/api/v1/users/client")
  }

  updateTrainee(data:User){
    return this.http.put<any>("http://localhost:8000/api/v1/users",data)
  }

  deleteTrainee(){
    return this.http.delete<any>("http://localhost:8000/api/v1/users")
  }

}
