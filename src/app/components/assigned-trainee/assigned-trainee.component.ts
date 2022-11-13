import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { TrainersService } from 'src/app/services/trainers.service';
import { DialogComponent } from '../dialog/dialog.component';
import {ThemePalette} from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

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
  emailTrainer:any
  clientsTrainer:any[]=[]
  trainerList:[] = []


  constructor(private dialog: MatDialog, private api: ApiService,private toastr: ToastrService,private trainerService:TrainersService,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data.email)
    this.emailTrainer= this.data.email;
    console.log(this.clientsTrainer)
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
        console.log(res)
         res.filter((item)=>!item.status)
        this.dataSource = new MatTableDataSource<User>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource)
      },
      error: (err) => {
        console.log(err)
       // alert("Error has occured while fetching the data!!! ")
       this.toastr.error("Error has occured while fetching the data!!!")}
    })
  }
  addTrainee(user:any){
    console.log(user._id)
    console.log(this.emailTrainer)
    this.clientsTrainer.push({id:user._id,email:this.emailTrainer})
    // this.trainerService.assignTrainee({email: this.dataTrainer,user:user._id})
    // if (this.clientsTrainer.length == 0) {
    //   this.clientsTrainer.push(user._id)
    // } else{
    //   this.clientsTrainer.push(user._id)
    // }
    console.log(this.clientsTrainer)
    //else if(this.clientsTrainer.some({user:user._id})){
    //   this.clientsTrainer.push({user:user._id})
    // }
  }
  assignTrainee(){
    for (let index = 0; index < this.clientsTrainer.length; index++) {

      console.log("hjjh")
      this.trainerService.assignTrainee({user:this.clientsTrainer[index]}).subscribe({next:(res)=>{
        //alert("Trainer updated Successfully");
        console.log(res)
      },
      error:()=>{
        //alert("Error has occured while updateing Data ")
       
      }
    })
    }
    console.log("ghghgh")
    this.trainerService.getTrainer();
  }
}
