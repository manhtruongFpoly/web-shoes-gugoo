import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailModel } from 'src/app/_model/OrderDetailModel';
import { OrderDetailService } from 'src/app/_service/order-detail-service/order-detail.service';

@Component({
  selector: 'app-list-order-detail',
  templateUrl: './list-order-detail.component.html',
  styleUrls: ['./list-order-detail.component.css']
})
export class ListOrderDetailComponent implements OnInit {

  orderDetails: OrderDetailModel[] = [];

  constructor(private orderDetailSer: OrderDetailService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listOderDetailById();
  }


  listOderDetailById() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.orderDetailSer.getOrderDetailById(id, 0, 5)
    .subscribe(data => {
      this.orderDetails = data.data.content;
      console.log(data);
    });
  }

}
