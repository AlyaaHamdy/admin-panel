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
  userCount!:number
  code: string = "Click to generate Code!!";


  chartOptions!: {};
  @Input() data: any = [];

  Highcharts = Highcharts;
  total: any;
  label: any;
  percentage: any;



  constructor(private api:ApiService,private http :HttpClient) { }

  ngOnInit() {
    this.api.getTrainee().subscribe({
      next:(res)=>{
        this.userCount = res.length
        //console.log(this.userCount)
      },
      error:(err)=>{
       // console.log(err)
      }
    })


    this.http.get<any>("http://localhost:8000/api/v1/users/allattendance").subscribe({
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
        data: this.userCount 
      }, {
        name: 'Revenue',
        data:  [10, 20, 30, 40]

      }, {
        name: 'Trainers',
        data:  [10, 20, 30, 40]
      }, {
        name: 'Orders',
        data: [10, 20, 30, 40]

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




