import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AdminDashboard';
  sideBarOpen= true


  ngOnInit(){}

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
