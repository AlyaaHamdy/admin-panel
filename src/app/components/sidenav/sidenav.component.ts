import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Attendence } from 'src/app/model/attendence';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  code: string ="Code!!";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Attendence>("http://localhost:8000/api/v1/users/getCode").subscribe({
      next: (res) => {
       if(res){
        this.code= res.code
        //console.log(res)
       }else{
        // alert("Generate Your Code")
       }
      },
      error: (err) => {
        console.log(err)
      }
    })
  
  }

  getGenerateCode() {
    this.http.get<Attendence>("http://localhost:8000/api/v1/users/attendce").subscribe({
      next: (res) => {
        this.code= res.code
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

}
