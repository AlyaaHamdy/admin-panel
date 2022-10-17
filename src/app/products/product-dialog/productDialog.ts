import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder , Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-productDialog',
  templateUrl: 'productDialog.html',
  styleUrls: ['./productDialog.scss']
})
export class productDialog implements OnInit {
 actionBtn :string ="Save"
 productForm! : FormGroup; 
  constructor(private formBuilder: FormBuilder,
    private api:ProductService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<productDialog> ) {
    
   }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
        title : ['',Validators.required],
        discription : ['',Validators.required],
        Category : ['',Validators.required],
        quantity:['',Validators.required],
        brand:['',Validators.required],
        image:['',Validators.required],
        price:['',Validators.required],

    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['discription'].setValue(this.editData.discription);
      this.productForm.controls['Category'].setValue(this.editData.Category);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['brand'].setValue(this.editData.brand);
      this.productForm.controls['image'].setValue(this.editData.image);
      this.productForm.controls['price'].setValue(this.editData.price);
    }
  }
  addTrainee(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added Successfully");
            this.productForm.reset();
            this.dialogRef.close();
          },
          error:()=>{
            alert("Error has occured while adding a trainee")
          }
        })
      }
    }else{
      this.updateTrainee()
    }
  }
  updateTrainee(){
    this.api.updateProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error has occured while updateing Data ")
      }
    })
  }

}