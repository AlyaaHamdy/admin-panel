import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-trainees',
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.scss']
})
export class TraineesComponent implements OnInit {
  isloading = true;

  displayedColumns: string[] = ['firstName', 'email', 'subscription', 'joinDate', 'gender', 'phoneNumber', 'address', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.isloading = true;
    this.getAllTrainees()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      // if (val === 'save') {
        console.log("finnnissssssssssssssh")
        this.getAllTrainees();
      // }
    })
  }

  getAllTrainees() {
    this.api.getTrainee().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.api.getTrainee();
      },
      error: (err) => {
        console.log(err)
        alert("Error has occured while fetching the data!!! ")
      }
    })

  }
  editTrainee(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      // if (val === 'update') {
        this.getAllTrainees()
      // }
    })
  }
  deleteTrainee(email: string) {
    console.log(email)
    this.api.deleteTrainee(email).subscribe({

      next: (res) => {
        // if ( res) {
        //   alert("Error");

        // }
        //alert("Trainee has deleted Successfully");
        location.reload()
        this.getAllTrainees();
         
      },
      // error: () => {
      //   alert("Error has occured while deleting the data")
      // }
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
