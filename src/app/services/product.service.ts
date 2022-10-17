import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  postProduct(data:any){
    return this.http.post<any>("http://localhost:3000/productsList/",data)
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productsList")
  }

  updateProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/productsList/"+ id,data)
  }

  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productsList/" + id)
  }
}