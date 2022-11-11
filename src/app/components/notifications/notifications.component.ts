import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['Message', 'SenderEmail', 'Date', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private notificationService: NotificationService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this.notificationService.getNotifications().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.notificationService.getNotifications();
      },
      error: (err) => {
        alert('Error has occured while feching the data!!! ');
      },
    });
  }
}
