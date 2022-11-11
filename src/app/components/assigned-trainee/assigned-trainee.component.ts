import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { TrainersService } from 'src/app/services/trainers.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-assigned-trainee',
  templateUrl: './assigned-trainee.component.html',
  styleUrls: ['./assigned-trainee.component.scss']
})
export class AssignedTraineeComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'email', 'subscription', 'startDate', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  


  constructor(private dialog: MatDialog, private api: ApiService,private trainerService:TrainersService) { }

  ngOnInit(): void {
    this.getAllTrainees();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(() => {
      // if (val === 'save') {
        console.log("finnnissssssssssssssh")
        this.getAllTrainees();
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

  getAllTrainees() {
    console.log("first")
    this.api.getTrainee().subscribe({
      
      next: (res) => {
        // console.log(res)
        this.dataSource = new MatTableDataSource<User>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource)
      },
      error: (err) => {
        console.log(err)
        alert("Error has occured while fetching the data!!! ")
      }
    })
  }
  assignTrainee(user:any){
    console.log(user)
    this.trainerService.updateTrainer(user)
  }
}
