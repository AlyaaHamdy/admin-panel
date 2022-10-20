import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder , Validator, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
 genderList = ["Male","Female"];
 actionBtn :string ="Save"
//  subscriptionList =["premium","standerd","basic"]
 traineeForm! : FormGroup; 
  constructor(private formBuilder: FormBuilder,
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent> ) {
    
   }

  ngOnInit(): void {
    this.traineeForm = this.formBuilder.group({
      traineeName : ['',Validators.required],
      traineeEmail : ['',Validators.required],
      subscription : ['',Validators.required],
      joinDate:['',Validators.required],
      gender:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required],
      comment:['',Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.traineeForm.controls['traineeName'].setValue(this.editData.traineeName);
      this.traineeForm.controls['traineeEmail'].setValue(this.editData.traineeEmail);
      this.traineeForm.controls['subscription'].setValue(this.editData.subscription);
      this.traineeForm.controls['joinDate'].setValue(this.editData.joinDate);
      this.traineeForm.controls['gender'].setValue(this.editData.gender);
      this.traineeForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.traineeForm.controls['address'].setValue(this.editData.address);
      this.traineeForm.controls['comment'].setValue(this.editData.comment);
    }
  }
  addTrainee(){
    if(!this.editData){
      if(this.traineeForm.valid){
        this.api.postTrainee(this.traineeForm.value).subscribe({
          next:(res)=>{
            alert("Trainee added Successfully");
            this.traineeForm.reset();
            this.dialogRef.close();
          },
          error:()=>{
            alert("Error has occured while adding a trainee")
          }
        })
      }
    }else{
      this.updateTrainee()
    }
  }
  updateTrainee(){
    this.api.updateTrainee(this.traineeForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Trainee updated Successfully");
        this.traineeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error has occured while updateing Data ")
      }
    })
  }

}
