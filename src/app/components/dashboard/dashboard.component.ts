import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Attendence } from 'src/app/model/attendence';
import { ApiService } from 'src/app/services/api.service';
import { TrainersService } from 'src/app/services/trainers.service';
import { OrderService } from 'src/app/services/order.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];
  chart: any[] = [];
  userCount!: number;
  totalUsers: number[] = [];
  totalTainers!: number[];
  trainerCount!: number;
  revenueCount!: number;
  totalRevenue!: number[];
  attendeesCount!: number
  totalAttendees!: number[];
  chartOptions = {};
  date: string[] = [];
  Attendence: number[] = [];
  code: string = "Click to generate Code!!";
  @Input() data: any = [];
  Highcharts = Highcharts;
  total: any;
  label: any = []
  percentage: any;

  constructor(private api: ApiService, private http: HttpClient, private trainerService: TrainersService, private orderService: OrderService) {
  }


  ngOnInit() {
    console.log("1")
    window.history.length == 0
    console.log("2")
    this.api.getTrainee().subscribe(res => {
      this.userCount = res.length
    })
    this.trainerService.getTrainer().subscribe(res => {
      this.trainerCount = res.length
    })
    this.orderService.getOrders().subscribe(res => {
      this.revenueCount = res.length
    })
    this.http.get<any>("http://localhost:8000/api/v1/users/tootalattendce").subscribe(res => {
      this.attendeesCount = res.counter
    })


    this.http.get<any>("http://localhost:8000/api/v1/users/attendcecharts").subscribe(res => {
      let arr = []
      for (let i = 0; i < res.length; i++) {
        let all = new Date(res[i].date)
        arr.push({ label: all.toLocaleString('en-En', { month: "short", day: "numeric" }), y: res[i].attendce.length });
      }
      this.chart = arr;
      console.log(this.chart);
      this.chartOptions = {
        animationEnabled: true,
        theme: "light1",
        title: {
          color: "orange",
          text: "Attendees Analysis"
        },
        axisY: {
          title: "Number of Attendees",
          includeZero: true
        },
        axisY2: {
          title: "",
          includeZero: true,
          labelFormatter: (e: any) => {
            var suffixes = ["", "K", "M", "B"];

            var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
            if (order > suffixes.length - 1)
              order = suffixes.length - 1;

            var suffix = suffixes[order];
            return (e.value / Math.pow(1000, order)) + suffix;
          }
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function (e: any) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: [{
          type: "column",
          theme: "light2",
          showInLegend: true,
          name: "Attendees",
          axisYType: "secondary",
          yValueFormatString: "",
          dataPoints: this.chart
        }, {
          type: "spline",
          showInLegend: true,
          name: "No of Attendees",
          dataPoints: this.chart
        }]
      }

    })

  }
  // ngAfterViewInit(): void {
  //   this.chartOptions = {
  //     animationEnabled: true,
  //     theme: "light2",
  //     title: {
  //       text: "Attendees Analysis"
  //     },
  //     axisY: {
  //       title: "Number of Attendees",
  //       includeZero: true
  //     },
  //     axisY2: {
  //       title: "Total Attendees",
  //       includeZero: true,
  //       labelFormatter: (e: any) => {
  //         var suffixes = ["", "K", "M", "B"];

  //         var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  //         if (order > suffixes.length - 1)
  //           order = suffixes.length - 1;

  //         var suffix = suffixes[order];
  //         return '$' + (e.value / Math.pow(1000, order)) + suffix;
  //       }
  //     },
  //     toolTip: {
  //       shared: true
  //     },
  //     legend: {
  //       cursor: "pointer",
  //       itemclick: function (e: any) {
  //         if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
  //           e.dataSeries.visible = false;
  //         } else {
  //           e.dataSeries.visible = true;
  //         }
  //         e.chart.render();
  //       }
  //     },
  //     data: [{
  //       type: "column",
  //       showInLegend: true,
  //       name: "Attendees",
  //       axisYType: "secondary",
  //       yValueFormatString: "$#,###",
  //       dataPoints: this.chart
  //     }, {
  //       type: "spline",
  //       showInLegend: true,
  //       name: "No of Attendees",
  //       dataPoints: this.chart
  //     }]
  //   }
  // }
}


  //   HC_exporting(Highcharts);

  //   setTimeout(() => {
  //     window.dispatchEvent(
  //       new Event('resize')
  //     );
  //   }, 300);
  // }









