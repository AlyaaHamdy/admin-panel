import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder , Validator, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
 genderList = ["male","female"];
 actionBtn :string ="Save"
//  subscriptionList =["premium","standerd","basic"]
 traineeForm! : FormGroup; 
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>
   ) {
    
   }

  ngOnInit(): void {
    this.traineeForm = this.formBuilder.group({
      firstName : ['',Validators.required],
    //  lastName: ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      subscription : ['',Validators.required],
      startDate:['',Validators.required],
      gender:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required],
     // endDate: ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.traineeForm.controls['firstName'].setValue(this.editData.firstName);
      //this.traineeForm.controls['lastName'].setValue(this.editData.lastName);
      this.traineeForm.controls['email'].setValue(this.editData.email);
      this.traineeForm.controls['subscription'].setValue(this.editData.subscription);
      this.traineeForm.controls['startDate'].setValue(this.editData.startDate);
      this.traineeForm.controls['gender'].setValue(this.editData.gender);
      this.traineeForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.traineeForm.controls['address'].setValue(this.editData.address);
     
    }
  }
  addTrainee(){

    if(!this.editData){
      console.log(this.traineeForm.value)
      console.log(this.traineeForm.valid)
      console.log("gggggggg")
      if(this.traineeForm.valid){
        console.log("fffffff")
       
        this.api.postTrainee(this.traineeForm.value).subscribe({
          
          next:(res)=>{
            // console.log(res)
            //alert("Trainee added Successfully");
            this.toastr.success("Trainee has been added Successfully")
            this.traineeForm.reset();
            this.dialogRef.close();
            // location.reload()
           
          },
          error:(err)=>{
            console.log(err)
            //alert("Error has occured while adding a trainee")
            this.toastr.error("Error has occured while adding a trainee!!!")
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
        console.log(res)
        // alert("Trainee updated Successfully");
        this.toastr.success("Trainee has been updated Successfully")
        this.traineeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
       // alert("Error has occured while updateing Data ")
       this.toastr.error("Error has occured while updateing trainee!!!")
      }
    })
  }

}
