import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './services/API/Loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isloading: boolean =true;

  constructor(private loader: LoaderService) {
     
  }
  ngOnInit() {
    this.loader.getLoader().subscribe(
      (data)=>{
        this.isloading =data
      }
     )
  }
  ngAfterViewInit(){
    this.isloading = false;
  }


}
