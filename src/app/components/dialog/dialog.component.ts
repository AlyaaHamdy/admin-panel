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
      firstName : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      subscription : ['',Validators.required],
      startDate:['',Validators.required],
      gender:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required],
      

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.traineeForm.controls['firstName'].setValue(this.editData.firstName);
      this.traineeForm.controls['email'].setValue(this.editData.email);
      this.traineeForm.controls['password'].setValue(this.editData.password);
      this.traineeForm.controls['subscription'].setValue(this.editData.subscription);
      this.traineeForm.controls['startDate'].setValue(this.editData.startDate);
      this.traineeForm.controls['gender'].setValue(this.editData.gender);
      this.traineeForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.traineeForm.controls['address'].setValue(this.editData.address);
     
    }
  }
  addTrainee(){

    if(!this.editData){
      console.log("gggggggg")
      if(this.traineeForm.valid){
        console.log("fffffff")
        console.log(this.traineeForm.value)
        //this.api.postTrainee(this.traineeForm.value)
        this.api.postTrainee(this.traineeForm.value).subscribe({
          
          next:(res)=>{
            // console.log(res)
            //alert("Trainee added Successfully");
            this.traineeForm.reset();
            this.dialogRef.close();
            // location.reload()
           
          },
          error:(err)=>{
            console.log(err)
            alert("Error has occured while adding a trainee")
          }
        })
      }
    }else{
      this.updateTrainee()
    }
  }
  updateTrainee(){
    this.api.updateTrainee(this.traineeForm.value).subscribe({
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
