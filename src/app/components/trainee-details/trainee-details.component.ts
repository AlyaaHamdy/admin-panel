import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../model/user'

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent implements OnInit {
  traineeForm!: FormGroup;



  constructor(private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public user: any) { }


  ngOnInit(): void {


    console.log(this.user)
  }

}
