import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  getNotifications() {
    return this.http.get<Notification[]>(
      'http://localhost:8000/api/v1/notification'
    );
  }
}
