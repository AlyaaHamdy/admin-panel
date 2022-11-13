import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Attendence } from 'src/app/model/attendence';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];
  userCount!:number;
   totalUsers:number[];
  trainerCount!:number;
  revenewCount!:number;
  totalAttendees!:number

  code: string = "Click to generate Code!!";


  chartOptions!: {};
  @Input() data: any = [];

  Highcharts = Highcharts;
  total: any;
  label: any;
  percentage: any;



  constructor(private api:ApiService,private http :HttpClient) {
    this.totalUsers=[]
   }

  ngOnInit() {
    this.api.getTrainee().subscribe(res=>{
        
        this.userCount = res.length
        this.totalUsers.push(this.userCount)
        console.log(this.totalUsers)
     
    
    })


    this.http.get<any>("http://localhost:8000/api/v1/users/tootalattendce").subscribe({
      next: (res) => {
        //this.code= res.code
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'GYM DATA'
      },
      subtitle: {
        text: 'DATA'
      },
      tooltip: {
        split: true,
        // valueSuffix: ' millions'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      series: [{
        name: 'New Users',
        data: [...this.totalUsers] 
      }, {
        name: 'Revenue',
        data:  [1, 2, 3, 4]

      }, {
        name: 'Trainers',
        data:  [1, 2, 3, 4]
      }, {
        name: 'Attendees',
        data: [1, 2, 3, 4]

      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }




}




