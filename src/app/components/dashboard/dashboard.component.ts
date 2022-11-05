import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];

  code = this.http.get("http://localhost:8000/api/v1/users/attendce")


  chartOptions!: {} ;
  @Input() data: any = [];

  Highcharts = Highcharts;

  

  constructor(private http: HttpClient) {  }
  
  ngOnInit() {
    // this.bigChart = this.dashboardService.bigChart();
    // this.cards = this.dashboardService.cards();
    //this.http.get("http://localhost:8000/api/v1/users/attendce")



    

   

    
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
        valueSuffix: ' millions'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      series: [{
        name: 'New Users',
        data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 16214]
    }, {
        name: 'Revenue',
        data: [6685, 6535, 6389, 6384, 6251, 5725, 5631, 5047, 5039]

    }, {
        name: 'Users engagement',
        data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 4913]
    }, {
        name: 'Referral',
        data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 1550]

    }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

 

 getGenerateCode(code:string) {
  console.log(code)
    return code;
  }

}
 




