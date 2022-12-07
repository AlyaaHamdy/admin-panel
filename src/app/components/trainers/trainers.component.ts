import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainersDialogComponent } from '../trainers-dialog/trainers-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrainersService } from 'src/app/services/trainers.service';
import { User } from 'src/app/model/user';
import { TrainerDetailsComponent } from '../trainer-details/trainer-details.component';
import { AssignedTraineeComponent } from '../assigned-trainee/assigned-trainee.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'startDate', 'phoneNumber', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isloading = true;


  constructor(private dialog: MatDialog, private api: TrainersService, private toastr: ToastrService, private confirm: ConfirmDialogService) { }

  ngOnInit(): void {
    this.isloading = true;
    this.getAllTrainers()
  }

  openDialog() {
    this.dialog.open(TrainersDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      console.log("done")
      //if(val==='save'){
      this.getAllTrainers();
      //}
    })
  }

  getAllTrainers() {
    this.api.getTrainer().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.api.getTrainer();
      },
      error: (err) => {
        // alert("Error has occured while feching the data!!! ")
        this.toastr.error("Error has occured while feching the data")
      }
    })

  }
  editTrainer(row: any) {
    this.dialog.open(TrainersDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      //if(val==='update'){
      this.getAllTrainers()
      //}
    })
  }

  deleteTrainer(email: string) {
    this.confirm.openConfirmDialog('Are you sure to delete this record ?').afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.api.deleteTrainer(email).subscribe({
            next: () => {
              this.toastr.success("Trainer has deleted successfully");
              this.getAllTrainers();
            }
          });
        }

      },
      error: () => {
        this.toastr.error("Error has occured while deleting the data!!!")
      },
    })

  }
  assignedTrainee(trainer: any) {
    console.log(trainer)
    const dialogRef = this.dialog.open(AssignedTraineeComponent, { data: trainer });
    dialogRef.afterClosed().subscribe(user => {
      //console.log(`Dialog result: ${user}`);
    });
  }
  showDetails(user: any): any {
    console.log(user)
    const dialogRef = this.dialog.open(TrainerDetailsComponent, { width: '0', height: '0', data: user });

    dialogRef.afterClosed().subscribe(user => {
      //console.log(`Dialog result: ${user}`);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
