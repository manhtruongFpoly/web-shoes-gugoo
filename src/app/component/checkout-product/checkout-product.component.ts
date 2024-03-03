import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/_model/CartModel';
import { Payment } from 'src/app/_model/Payment';
import { CheckoutModel } from 'src/app/_model/CheckoutModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { CheckoutService } from 'src/app/_service/checkout-service/checkout.service';
import { PaymentService } from 'src/app/_service/payment-service/payment.service';
import { PromotionService } from 'src/app/_service/promotion-service/promotion.service';
import { GhnService } from 'src/app/_service/ghn-service/ghn.service';
import { ValidateInput } from 'src/app/_model/validate-input.model';
import { CommonFunction } from 'src/app/utils/common-function';
import { VnpayService } from 'src/app/_service/vnpay-service/vnpay.service';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.scss']
})
export class CheckoutProductComponent implements OnInit {

  cart: CartModel = new CartModel();
  carts: CartModel[] = [];

  pays: any[] = [];
  pays1: any[] = [];

  provinceName: any;
  provinceId: any;
  districtName: any;
  wardName: any;
  province: any[] = [];
  district: any[] = [];
  ward: any[] = [];

  shippingTotal: any;
  serviceId: any;
  addressName: any;

  ship: any;
  sdt: any;
  nameKh: any;
  des: any;
  tinh: any;
  quan: any;
  xa: any;

  payment: Payment = new Payment();
  payment2: Payment = new Payment();

  checkouts: CheckoutModel = new CheckoutModel();
  totalAmount: number = 0;
  quantityCart!: number;
  discount: number = 0;
  amount!: number;
  validForm!: FormGroup;
  code: any;
  value: number = 0;
  isLoading: boolean = false;
  provenId!: number;

  validFullname:ValidateInput = new ValidateInput();
  validPhone:ValidateInput = new ValidateInput();
  validProvince:ValidateInput = new ValidateInput();
  validDistrict:ValidateInput = new ValidateInput();
  validWard:ValidateInput = new ValidateInput();

  constructor(
              private cartSer: CartService,
              private checkoutSer: CheckoutService,
              private toast: ToastrService,
              private paymentSer: PaymentService,
              private app: AppComponent,
              private promotionSer: PromotionService,
              private restGhn: GhnService,
              private router: Router,
              private vnpayService: VnpayService
  ) { }

  ngOnInit() {
    this.getCartByUser();
    this.getSumTotal();
    this.getPayment();
    this.getProvinces();
  }

  validatePhone(){
    this.validPhone = CommonFunction.validateInput2(this.checkouts.phone,true, 20, null)
  }

  validateFullname(){
    this.validFullname = CommonFunction.validateInput(this.checkouts.fullname, 250, null)
  }

  revoveInvalid(result){
    result.done = true
  }

  getCartByUser() {
    this.cartSer.getAllCartByUser()
      .subscribe(data => {
        this.carts = data.data;
      });
  }

  getPayment() {
    this.paymentSer.getPayment()
    .subscribe(data => {
      this.pays[0] = data.data[0];
      this.pays1[0] = data.data[1];

      console.log(this.pays+ "0");
      console.log(this.pays1+ "1");

    });
  }

  getOnePayment1(id:number){
    this.paymentSer.getOne(id).subscribe(response=>{
      this.payment = response.data;
      console.log(this.payment + "hg" + id + "da");

    })
  }

  getOnePayment2(id:number){
    this.paymentSer.getOne(id).subscribe(response=>{
      this.payment2 = response.data;
      console.log(this.payment + "hg" + id + "da");

    })
  }

  getAmount() {
    return this.amount = this.totalAmount + this.shippingTotal;
  }

  getSumTotal() {
    this.cartSer.getSumTotal()
      .subscribe(data => {
        this.totalAmount = data.data.totalAmount;
        this.quantityCart = data.data.quantityCart;
      });
  }

  checkPromotion() {
    this.promotionSer.checkPromotion(this.code)
    .subscribe(data => {
      console.log(data);
      this.value = data.data.discountValue;
    })
  }

  checkoutProduct() {

    this.checkouts.fullname = CommonFunction.trimText(this.checkouts.fullname)
    this.checkouts.phone = CommonFunction.trimText(this.checkouts.phone)
    this.validProvince = CommonFunction.validateInput(this.province, null, null)
    this.validDistrict = CommonFunction.validateInput(this.district, null, null)
    this.validWard = CommonFunction.validateInput(this.ward, null, null)

    if(!this.validFullname.done || !this.validPhone.done ||  !this.validProvince.done || !this.validDistrict.done){
      return
    }

    console.log(this.checkouts.paymentId);

    if(this.checkouts.paymentId == 1){
      
      this.vnpayService.getPayment(this.amount).subscribe((res)=>{
        console.log(res);
        if (res && res.data) {
          const redirectUrl = res.data;
          window.open(redirectUrl, '_blank');
        }
      })

    }
    // else{
    //   this.checkouts.address = this.addressName;
    //   this.checkouts.shipping = this.shippingTotal;
    //   this.checkouts.province = this.provinceName;
    //   this.checkouts.district = this.districtName;
    //   this.checkouts.ward = this.wardName;
    //   this.checkouts.grandTotal = this.amount;
  
    //   // this.checkouts.grandTotal = this.getAmount();
    //   this.checkoutSer.checkOut(this.checkouts)
    //   .subscribe(data => {
    //     console.log(data.data);
    //     this.toast.success('Đặt hàng thành công!');
    //     this.ngOnInit();
    //     // this.router.navigate(["list-order"]);
    //   });
    // }
  }

  getShipping(districtId: any) {
    const data = {
      "shop_id": 3526682,
      "from_district": 1542, // tu ha dong
      "to_district": districtId
    }

    this.restGhn.getService(data).subscribe(res => {
      
      this.serviceId = res.data[0].service_id;

      console.log(this.wardCode);
      const shippingOrder = {
        "service_id": this.serviceId,
        "insurance_value": this.totalAmount,
        "from_district_id": 3440,
        "to_district_id": data.to_district,
        "to_ward_code": this.wardCode,
        "weight": 1000
      }

      this.restGhn.getShipping(shippingOrder).subscribe(res => {
        this.shippingTotal = res.data.total;
        console.log(this.shippingTotal);
      })

    })

  }

  getProvinces() {
    this.restGhn.getProvince().subscribe(response => {
      this.province = response.data;
      console.log(response.data)
    })
  }

  getDistrict(event) {
    console.log(event);
    this.provinceName = event.ProvinceName;
    this.restGhn.getDistrict(event.ProvinceID).subscribe(response => {
      this.district = response.data;
      console.log(response.data);
    })
    this.provinceId = event.ProvinceID;
  }

  districtID:any;
  getWard(event) {
    console.log(event);
    this.provinceName = event.DistrictName;
    this.districtID = event.DistrictID;
    this.restGhn.getWard(event.DistrictID).subscribe(response => {
      this.ward = response.data;
      console.log(this.wardCode);
    })
  }

  wardCode;
  selectWard(event){
    this.wardName = event.WardName
    this.wardCode = event.WardCode
    console.log(this.districtID);
    this.getShipping(this.districtID);
    this.addressName = this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
    console.log(this.addressName);
  }


}
