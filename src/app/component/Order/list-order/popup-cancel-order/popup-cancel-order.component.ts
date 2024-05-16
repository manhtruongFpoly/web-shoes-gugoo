import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/_service/order-service/order.service';

@Component({
  selector: 'app-popup-cancel-order',
  templateUrl: './popup-cancel-order.component.html',
  styleUrls: ['./popup-cancel-order.component.scss']
})
export class PopupCancelOrderComponent implements OnInit {

  id:number;
  reason:string;

  constructor(
    public dialogRef: MatDialogRef<PopupCancelOrderComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private toaStr : ToastrService,
    private orderSer: OrderService, 
  ) { 
    this.id = data.id
  }

  ngOnInit() {
  }

  submit(){
    this.orderSer.canceledOrder(this.id, this.reason)
      .subscribe(data => {
        this.toaStr.success("Hủy đơn hàng thành công!");
        this.dialogRef.close();
      });
  }

  closeModal(){
    this.dialogRef.close({event: 'cancel'});
  }

}
