import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {User} from '../../model/user'

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent implements OnInit {
  traineeForm! : FormGroup; 
 
  

  constructor(private formBuilder: FormBuilder,) { }
  
  User!: User;
  ngOnInit(): void {
    this.traineeForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName: ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      subscription : ['',Validators.required],
      startDate:['',Validators.required],
      gender:['',Validators.required],
      phoneNumber:['',Validators.required],
      address:['',Validators.required],
      endDate: ['',Validators.required],
    });
  }

}
