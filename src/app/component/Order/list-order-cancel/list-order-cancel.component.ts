import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { OrderService } from 'src/app/_service/order-service/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-order-cancel',
  templateUrl: './list-order-cancel.component.html',
  styleUrls: ['./list-order-cancel.component.css']
})
export class ListOrderCancelComponent implements OnInit {

  orders: any[] = [];
  count1: any;
  count2: any;
  count3: any;
  count4: any;
  count5: any;

  constructor(private orderSer: OrderService,
              private toast: ToastrService,
              private app: AppComponent) { }

  ngOnInit(): void {
    this.getListOrderByStatus();
    this.getCountOrder1();
    this.getCountOrder2();
    this.getCountOrder3();
    this.getCountOrder4();
    this.getCountOrder5();
  }

  getListOrderByStatus() {
    this.orderSer.getOrderByStatusandAccount("DAHUY")
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

  reOrderIntoCart(order: any) {
    // this.orderSer.reOrderIntoCart(order.id)
    // .subscribe(data => {
    //   this.toast.success({ summary: 'Mua lại sản phẩm thành công!', duration: 3000 });
    //     this.app.ngOnInit();
    // });
  }

}
