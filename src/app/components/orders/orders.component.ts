import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'email',
    'items',
    'TotalPrice',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  color: string = '#ff5733';
  items: any;
  constructor(private orderService: OrderService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllOrders();
    console.log(this.getAllOrders());
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.orderService.getOrders();
      },
      error: (err) => {
        alert('Error has occured while feching the data!!! ');
      },
    });
  }
  getTotal(row: any): number {
    let total = 0;
    for (let index = 0; index < row.items.length; index++) {
      total += row.items[index].price;
    }
    return total;
  }

  changeItems(row: any) {
    this.items = row;
  }
}
