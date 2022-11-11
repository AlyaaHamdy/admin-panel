import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  postProduct(form:FormData) {
    console.log("Product")
    return this.http.post<Product>("http://localhost:8000/api/v1/products/add",form)
  }
  getProduct() {
    return this.http.get<Product[]>("http://localhost:8000/api/v1/products")
  }

  updateProduct(data: FormData) {
    return this.http.patch("http://localhost:8000/api/v1/products/update", data)
  }

  deleteProduct(title: string) {
    console.log(title)
    return this.http.delete<any>("http://localhost:8000/api/v1/products/delete", {
      body: {
        "title": title
      }
    },)
  }
}
