import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getOrders() {
    return this.http.get<Order[]>('http://localhost:8000/api/v1/Orders');
  }
  updateOrder(data: Order) {
    return this.http.put<any>(
      'http://localhost:8000/api/v1/Orders/update',
      data
    );
  }
}
