import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder , Validator, Validators } from '@angular/forms';
import { TrainersService } from '../../services/trainers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trainers-dialog',
  templateUrl: './trainers-dialog.component.html',
  styleUrls: ['./trainers-dialog.component.scss']
})
export class TrainersDialogComponent implements OnInit {
 genderList = ["male","female"];
 actionBtn :string ="Save"
//  subscriptionList =["premium","standerd","basic"]
trainerForm! : FormGroup; 
  constructor(private formBuilder: FormBuilder,
    private api:TrainersService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent> ) {
    
   }

  ngOnInit(): void {
    this.trainerForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      startDate:['',Validators.required],
      gender:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.trainerForm.controls['firstName'].setValue(this.editData.firstName);
      this.trainerForm.controls['email'].setValue(this.editData.email);
      this.trainerForm.controls['startDate'].setValue(this.editData.startDate);
      this.trainerForm.controls['gender'].setValue(this.editData.gender);
      this.trainerForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.trainerForm.controls['address'].setValue(this.editData.address);
    }
  }
  addTrainer(){
    if(!this.editData){
      console.log(this.trainerForm.valid)
      if(this.trainerForm.valid){
        this.api.postTrainer(this.trainerForm.value).subscribe({
          next:(res)=>{
           // alert("Trainer added Successfully");
           this.toastr.success("Trainer added Successfully")
           this.trainerForm.reset();
           this.dialogRef.close();
           
          },
          error:(err)=>{
            //console.log(err)
            this.toastr.error("Error has occured while adding the trainer")
          }
        })
      }
    }else{
      this.updateTrainer()
    }
  }
  updateTrainer(){
    this.api.updateTrainer(this.trainerForm.value).subscribe({
      next:(res)=>{
        //alert("Trainer updated Successfully");
        this.trainerForm.reset();
        this.dialogRef.close('update');
        this.toastr.success("Trainer has updated Successfully")
      },
      error:()=>{
        //alert("Error has occured while updateing Data ")
        this.toastr.error("Error has occured while updating the trainer")
      }
    })
  }

}
