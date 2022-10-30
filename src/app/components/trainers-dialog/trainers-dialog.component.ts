import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder , Validator, Validators } from '@angular/forms';
import { TrainersService } from '../../services/trainers.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-trainers-dialog',
  templateUrl: './trainers-dialog.component.html',
  styleUrls: ['./trainers-dialog.component.scss']
})
export class TrainersDialogComponent implements OnInit {
 genderList = ["Male","Female"];
 actionBtn :string ="Save"
//  subscriptionList =["premium","standerd","basic"]
trainerForm! : FormGroup; 
  constructor(private formBuilder: FormBuilder,
    private api:TrainersService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent> ) {
    
   }

  ngOnInit(): void {
    this.trainerForm = this.formBuilder.group({
      trainerName : ['',Validators.required],
      trainerEmail : ['',Validators.required],
      subscription : ['',Validators.required],
      joinDate:['',Validators.required],
      gender:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required],
      comment:['',Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.trainerForm.controls['trainerName'].setValue(this.editData.trainerName);
      this.trainerForm.controls['trainerEmail'].setValue(this.editData.trainerEmail);
      this.trainerForm.controls['subscription'].setValue(this.editData.subscription);
      this.trainerForm.controls['joinDate'].setValue(this.editData.joinDate);
      this.trainerForm.controls['gender'].setValue(this.editData.gender);
      this.trainerForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.trainerForm.controls['address'].setValue(this.editData.address);
      this.trainerForm.controls['comment'].setValue(this.editData.comment);
    }
  }
  addTrainer(){
    if(!this.editData){
      if(this.trainerForm){
        this.api.postTrainer(this.trainerForm.value).subscribe({
          next:(res)=>{
            alert("Trainer added Successfully");
            this.trainerForm.reset();
            this.dialogRef.close();
          },
          error:()=>{
            alert("Error has occured while adding a trainer")
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
        alert("Trainer updated Successfully");
        this.trainerForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error has occured while updateing Data ")
      }
    })
  }

}
