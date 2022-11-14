import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from "../../../model/product"
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-productDialog',
  templateUrl: 'productDialog.html',
  styleUrls: ['./productDialog.scss']
})
export class productDialog implements OnInit {
  actionBtn: string = "Save"
  productForm!: FormGroup;
  isUploading: boolean = false;
  product: Product;
  Files: File[] = [];
  display:string = "none"

  constructor(private formBuilder: FormBuilder,
    private api: ProductService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<productDialog>,

    // src: string, public file: File
  ) {
    this.product = { id: 0, title: "", discription: "", price: 1, quantity: 1, brand: '', categoryId: 0, Category: "", image: null }

  }
  AddImages(event: any): void {
    // console.log(event.target.files)
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.Files.push(event.target.files[i]);
      }
      this.product.image = this.Files;
    }
    else {
      alert("upload some images")
    }
  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      discription: ['', Validators.required],
      Category: ['', Validators.required],
      quantity: ['', Validators.required],
      brand: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],

    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['discription'].setValue(this.editData.discription);
      this.productForm.controls['Category'].setValue(this.editData.Category);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['brand'].setValue(this.editData.brand);
      this.productForm.controls['image'].setValue("");
      this.productForm.controls['price'].setValue(this.editData.price);
    }
  }
  addProduct() {

    // if (!this.editData) {
    console.log(this.productForm.valid)
    if (this.editData==undefined||this.editData == null) {
      let form: FormData = new FormData()
      for (let i = 0; i < this.Files.length; i++) {

        form.append("image", this.Files[i], this.Files[i].name);
      }
      form.append("title", this.productForm.value["title"])
      form.append("discription", this.productForm.value["discription"])
      form.append("Category", this.productForm.value["Category"])
      form.append("categoryId", '0')
      form.append("quantity", this.productForm.value["quantity"])
      form.append("brand", this.productForm.value["brand"])
      form.append("price", this.productForm.value["price"])
     // console.log(form.get('files'))
      this.api.postProduct(form).subscribe({
        next: (res) => {
          // alert("Product added Successfully");
          this.toastr.success("Product has been added Successfully")

          this.productForm.reset();

          this.dialogRef.close('Save');
          // this.getAllProducts();
        },
        error: () => {

          // alert("Error has occured while adding a product")
          this.toastr.error("Error has occured while adding the data")
        }
      })
    }

    else {
      this.updateProduct()
    }
  }
 
  updateProduct() {
    this.display = "block"
    let form: FormData = new FormData()
      for (let i = 0; i < this.Files.length; i++) {

        form.append("image", this.Files[i], this.Files[i].name);
      }
      form.append("title", this.productForm.value["title"])
      form.append("discription", this.productForm.value["discription"])
      form.append("Category", this.productForm.value["Category"])
      form.append("categoryId", '0')
      form.append("quantity", this.productForm.value["quantity"])
      form.append("brand", this.productForm.value["brand"])
      form.append("price", this.productForm.value["price"])
    this.api.updateProduct(form).subscribe({
      next: (res) => {
        console.log(res)
       // alert("Product updated Successfully");
       this.toastr.success("Product has been updated Successfully")
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        //alert("Error has occured while updateing Data ")
        this.toastr.error("Error has occured while updateing the data")
      }
    })
  }

}
