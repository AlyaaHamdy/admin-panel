import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { productDialog } from '../products/product-dialog/productDialog';
import { ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'Category', 'quantity', 'action'];
  dataSource!: MatTableDataSource<any>;

  isloading = true;

  constructor(private dialog: MatDialog, private productServices: ProductService, private toastr: ToastrService, private confirm: ConfirmDialogService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.isloading = true;
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(productDialog, {
      width: '30%'
    }).afterClosed().subscribe(val => {

      this.getAllProducts();

    })
  }


  getAllProducts() {
    this.productServices.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productServices.getProduct();
      },
      error: (err) => {
        // alert("Error has occured while feching the data!!! ")
        this.toastr.error("Error has occured while deleting the data")
      }
    })
  }
  editProduct(row: any) {
    this.dialog.open(productDialog, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {

      this.getAllProducts()

    })
  }

  showDetails(product: any): any {
    console.log(product)
    const dialogRef = this.dialog.open(ProductDetailsComponent, { width: "50%", data: product });

    dialogRef.afterClosed().subscribe(product => {
      //console.log(`Dialog result: ${user}`);
    });
  }





  deleteProduct(title: string) {
    // this.productServices.deleteProduct(title).subscribe({
    //   next:(res)=>{

    //     // if("error" == res)
    //     // {
    //     // //alert("Error");

    //     // }
    //     //alert("Product has deleted Successfully");
    //     this.toastr.success("Product has deleted Successfully")
    //     this.getAllProducts();
    //   },
    //   error:()=>{
    //    // alert("Error has occured while deleting the data")
    //    this.toastr.error("Error has occured while deleting the Product")
    //   }
    // })
    this.confirm.openConfirmDialog('Are you sure to delete this record ?').afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.productServices.deleteProduct(title).subscribe({
            next: () => {
              this.toastr.success("Trainer has been deleted successfully");
              this.getAllProducts();
            }
          });
        }

      },
      error: () => {
        this.toastr.error("Error has occured while deleting the data!!!")
      },
    })


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
