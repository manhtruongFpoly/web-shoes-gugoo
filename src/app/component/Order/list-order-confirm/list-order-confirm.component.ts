import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order-service/order.service';

@Component({
  selector: 'app-list-order-confirm',
  templateUrl: './list-order-confirm.component.html',
  styleUrls: ['./list-order-confirm.component.css']
})
export class ListOrderConfirmComponent implements OnInit {

  orders: any[] = [];
  count1: any;
  count2: any;
  count3: any;
  count4: any;
  count5: any;

  constructor(private orderSer: OrderService) { }

  ngOnInit(): void {
    this.getListOrderByStatus();
    this.getCountOrder1();
    this.getCountOrder2();
    this.getCountOrder3();
    this.getCountOrder4();
    this.getCountOrder5();
  }

  getListOrderByStatus() {
    this.orderSer.getOrderByStatusandAccount("DANGXULY")
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

}
