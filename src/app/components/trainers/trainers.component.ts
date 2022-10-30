import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TrainersDialogComponent } from '../trainers-dialog/trainers-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TrainersService } from 'src/app/services/trainers.service';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  displayedColumns: string[] = ['trainerName', 'trainerEmail', 'subscription', 'joinDate','gender','phoneNumber','address','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private dialog :MatDialog, private api:TrainersService) { }

  ngOnInit(): void {
    this.getAllTrainers()
  }

  openDialog() {
    this.dialog.open(TrainersDialogComponent,{
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllTrainers();
      }
    })
  }

  getAllTrainers(){
    this.api.getTrainer().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.api.getTrainer();
      },
      error:(err)=>{
        alert("Error has occured while feching the data!!! ")
      }
    })

  }
  editTrainer(row:any){
    this.dialog.open(TrainersDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllTrainers()
      }
    })
  }
  deleteTrainer(id:number){
    this.api.deleteTrainer(id).subscribe({
      next:(res)=>{
        alert("Trainer has deleted Successfully");
        this.getAllTrainers();
      },
      error:()=>{
        alert("Error has occured while deleting the data")
      }
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
