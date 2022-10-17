import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  postTrainee(data:any){
    return this.http.post<any>("http://localhost:3000/traineesList/",data)
  }

  getTrainee(){
    return this.http.get<any>("http://localhost:3000/traineesList")
  }

  updateTrainee(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/traineesList/"+ id,data)
  }

  deleteTrainee(id:number){
    return this.http.delete<any>("http://localhost:3000/traineesList/" + id)
  }

}
