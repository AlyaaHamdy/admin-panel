import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private confirmDialog:MatDialog) { }


  openConfirmDialog(msg: any){
  return  this.confirmDialog.open(ConfirmDialogComponent ,{
      width:'390px',
      disableClose:true,
      position:{top:'10px'},
      data:{
       message:msg 
      }

    });
    }
  }

