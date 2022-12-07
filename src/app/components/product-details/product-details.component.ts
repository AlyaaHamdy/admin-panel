import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  index: any;

  //images :any =[]


  constructor(@Inject(MAT_DIALOG_DATA) public product: any) { }

  ngOnInit(): void {
    console.log(this.product)
    //this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  }
  increse(i: any) {
    i + 1
  }

}
