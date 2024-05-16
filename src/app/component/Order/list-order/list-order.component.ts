import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order-service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { PopupCancelOrderComponent } from './popup-cancel-order/popup-cancel-order.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  validForm!: FormGroup;
  orders: any[] = [];
  count1: any;
  count2: any;
  count3: any;
  count4: any;
  count5: any;
  reason: any;

  constructor(
    private orderSer: OrderService, 
    private toast: ToastrService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.validForm = new FormGroup({
      'reason': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
    });

    this.getListOrderByStatus();
    this.getCountOrder1();
    this.getCountOrder2();
    this.getCountOrder3();
    this.getCountOrder4();
    this.getCountOrder5();
  }

  getListOrderByStatus() {
    this.orderSer.getOrderByStatusandAccount("CHOXACNHAN")
      .subscribe(data => {
        this.orders = data.data;
        console.log(data.data);
      });
  }

  getCountOrder1() {
    this.orderSer.getCountOrderByStatus(0)
      .subscribe(data => {
        this.count1 = data.data;
        console.log(data);
      });
  }

  getCountOrder2() {
    this.orderSer.getCountOrderByStatus(1)
      .subscribe(data => {
        this.count2 = data.data;
        console.log(data);
      });
  }

  getCountOrder3() {
    this.orderSer.getCountOrderByStatus(2)
      .subscribe(data => {
        this.count3 = data.data;
        console.log(data);
      });
  }

  getCountOrder4() {
    this.orderSer.getCountOrderByStatus(3)
      .subscribe(data => {
        this.count4 = data.data;
        console.log(data);
      });
  }

  getCountOrder5() {
    this.orderSer.getCountOrderByStatus(4)
      .subscribe(data => {
        this.count5 = data.data;
        console.log(data);
      });
  }

  // modalCancelOrder(id: number){
  //   const data = {
  //     id: id
  //   }
  //   this.matDialog
  //   .open(PopupCancelOrderComponent, {
  //     width: "650px",
  //     maxHeight: "90vh",
  //     maxWidth: "90vw",
  //     data: data,
  //     panelClass: "school-year",
  //     autoFocus: false,
  //   })
  //   .afterClosed().subscribe((resp) => {
  //     this.getListOrderByStatus();
  //   });
  // }

  cancelOrder(id: number) {
    this.orderSer.canceledOrder(id, this.reason)
      .subscribe(data => {
        this.toast.success('Hủy đơn hàng thành công!');
        this.ngOnInit();
      });
  }
}
