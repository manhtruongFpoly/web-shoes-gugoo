import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/_model/CartModel';
import { Payment } from 'src/app/_model/Payment';
import { CheckoutModel } from 'src/app/_model/CheckoutModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import * as _ from 'lodash';
import { ProductService } from 'src/app/_service/product-service/product.service';

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

  queryParam: any;

  validationCreateBook = {
    fullname: { flag: false, message: '' },
    phone: { flag: false, message: '' },
    province: { flag: false, message: '' },
    district: { flag: false, message: '' },
    ward: { flag: false, message: '' },
  };

  listCartNoneLogin: [];

  constructor(
              private cartSer: CartService,
              private checkoutSer: CheckoutService,
              private toast: ToastrService,
              private paymentSer: PaymentService,
              private app: AppComponent,
              private promotionSer: PromotionService,
              private restGhn: GhnService,
              private router: Router,
              private vnpayService: VnpayService,
              private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private proSer: ProductService,
  ) { 
    this.activatedRoute.queryParams.subscribe(param => {

      if(this.queryParam === param){
        return;
      }
      this.queryParam = param;
      console.log('da vao day', this.queryParam);
    });
  }

  ngOnInit() {
    this.checkoutProductVnPay(this.queryParam);
    this.getCartByUser();
    this.getSumTotal();
    this.getPayment();
    this.getProvinces();
  }


  getCartByUser() {
    const user  = this.tokenStorage.getUser()
    if(user === null || user === '' || user === undefined){
      this.listCartNoneLogin = getArrayFromSessionStorage();
      this.listCartNoneLogin.forEach((item:any) => {
        this.proSer.getByProductId(item.productId).subscribe(res=>{
          const product = res.data.data;
          const cart = {
            id: 1,
            name: product.name,
            price: product.priceNew,
            quantity: item.quantity,
            total: item.total,
            image: product.imgList,
            product_id: product.id,
            productId: product.id,
            sizeName: item.sizeName,
            colorName: item.colorName,
            userId: 1
          }
          this.carts.push(cart);
          this.totalAmount += product.priceNew;
          this.quantityCart += item.quantity;
        })
      })
    }else{
      this.cartSer.getAllCartByUser()
      .subscribe(data => {
        this.carts = data.data;
      });
    }
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
    const user  = this.tokenStorage.getUser()
    if(user === null || user === '' || user === undefined){
      return;
    }else{
      this.cartSer.getSumTotal()
      .subscribe(data => {
        this.totalAmount = data.data.totalAmount;
        this.quantityCart = data.data.quantityCart;
      });
    }
  }

  checkPromotion() {
    this.promotionSer.checkPromotion(this.code)
    .subscribe(data => {
      console.log(data);
      this.value = data.data.discountValue;
    })
  }


  checkoutProductVnPay(queryParam){
    if(queryParam.vnp_ResponseCode === "00"){
      const dataString = localStorage.getItem('checkouts');
      const dataObject = JSON.parse(dataString);

      this.checkouts.fullname = dataObject.fullname;
      this.checkouts.phone = dataObject.phone;
      this.checkouts.address = dataObject.address;
      this.checkouts.shipping = dataObject.shipping;
      this.checkouts.province = dataObject.province;
      this.checkouts.district = dataObject.district;
      this.checkouts.ward = dataObject.ward;
      this.checkouts.grandTotal = dataObject.grandTotal;
      this.checkouts.vnp_ResponseCode = queryParam.vnp_ResponseCode;
      this.checkouts.description = dataObject.description;

      console.log(this.checkouts);

      const user  = this.tokenStorage.getUser()
      if(user === null || user === '' || user === undefined){
        this.checkouts.lstCart = this.listCartNoneLogin;

        if(this.tokenStorage.getUserId()){
          this.checkouts.userId = Number(this.tokenStorage.getUserId());
        }else{
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1; 
          const date = now.getDate();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const milliseconds = now.getMilliseconds();
  
          const userId = `${year}${month}${date}${hours}${minutes}${milliseconds}`;
          this.checkouts.userId = Number(userId);
          
        }

        this.checkoutSer.checkOutNotLogger(this.checkouts)
        .subscribe(data => {
          this.toast.success('Đặt hàng thành công!');
          sessionStorage.removeItem('cart');
          this.tokenStorage.setUserId(data.data.userId);
          this.router.navigate(["/home/list-order"]);
        });
      }else{
        this.checkoutSer.checkOut(this.checkouts)
        .subscribe(data => {
          console.log(data.data);
          this.toast.success('Đặt hàng thành công!');
          this.tokenStorage.clearInformationCheckouts();
          this.router.navigate(["/home/list-order"]);
        });
      }
    }
  }

  checkoutProduct() {

    const validateAllField = this.validateAlField();

    if (validateAllField){
     return;
    }

    if(this.checkouts.province === null 
      || this.checkouts.province === undefined 
      || this.checkouts.province === ''
      ){
      this.toast.error(' Tỉnh/Thành Phố không được bỏ trống');
      return;
    }

    if(this.checkouts.district === null 
      || this.checkouts.district === undefined 
      || this.checkouts.district === ''
      ){
      this.toast.error(' Quận/Huyện không được bỏ trống');
      return;
    }

    if(this.checkouts.ward === null 
      || this.checkouts.ward === undefined 
      || this.checkouts.ward === ''
      ){
      this.toast.error('  Phường/Xã không được bỏ trống');
      return;
    }

    if(this.checkouts.paymentId === null 
      || this.checkouts.paymentId === undefined 
      ){
      this.toast.error(' Hình Thức Thanh Toán khong bỏ trống');
      return;
    }

    console.log(this.checkouts.paymentId);

    this.checkouts.address = this.addressName;
    this.checkouts.shipping = this.shippingTotal;
    this.checkouts.province = this.provinceName;
    this.checkouts.district = this.districtName;
    this.checkouts.ward = this.wardName;
    this.checkouts.grandTotal = this.amount;

    if(this.checkouts.paymentId == 1){
      this.vnpayService.getPayment(this.amount).subscribe((res)=>{
        console.log(res);
        if (res && res.data) {
          const redirectUrl = res.data;
          console.log(res.data);
          window.open(redirectUrl, '_blank');
          this.tokenStorage.saveInformationCheckouts(JSON.stringify(this.checkouts));
        }
      })
    }else if(this.checkouts.paymentId == 0){
      // this.checkouts.grandTotal = this.getAmount();
      const user  = this.tokenStorage.getUser()
      if(user === null || user === '' || user === undefined){
        this.checkouts.lstCart = this.listCartNoneLogin;
        if(this.tokenStorage.getUserId()){
          this.checkouts.userId = Number(this.tokenStorage.getUserId());
        }else{
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1; 
          const date = now.getDate();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const milliseconds = now.getMilliseconds();
  
          const userId = `${year}${month}${date}${hours}${minutes}${milliseconds}`;
          this.checkouts.userId = Number(userId);
        }

        this.checkoutSer.checkOutNotLogger(this.checkouts)
        .subscribe(data => {
          console.log(data.data);
          this.toast.success('Đặt hàng thành công!');
          sessionStorage.removeItem('cart');
          this.tokenStorage.setUserId(data.data.userId);
          this.router.navigate(["/home/list-order"]);
        });
      }else{
        this.checkoutSer.checkOut(this.checkouts)
        .subscribe(data => {
          console.log(data.data);
          this.toast.success('Đặt hàng thành công!');
          this.router.navigate(["/home/list-order"]);
        });
      }
    }
  }

  validateAlField() {
    const validationFields = [
      { key: 'fullname', maxLength: 250, checkMaxLength: true, flag: 'Họ và tên không được bỏ trống', flagMaxlength: 'Họ và tên không được nhập quá 250 ký tự' },
      { key: 'phone', maxLength: 20, checkMaxLength: true, flag: 'Số điện thoại không được bỏ trống', flagMaxlength: 'Số điện thoại không được nhập quá 20 ký tự' },
      // { key: 'province', maxLength: 0, checkMaxLength: false, flag: 'Tỉnh/Thành Phố không được bỏ trống' },
      // { key: 'district', maxLength: 0, checkMaxLength: false, flag: 'Quận/Huyện không được bỏ trống' },
      // { key: 'ward', maxLength: 0, checkMaxLength: false, flag: 'Phường/Xã không được bỏ trống' },
    ];

    let hasError = false;
    for (const field of validationFields) {
      const { key, maxLength, checkMaxLength, flag, flagMaxlength } = field;
      const value = this.checkouts[key];
      const config = {
        validateFlag: key,
        validateMessage: flag,
        checkMaxLength: checkMaxLength,
        maxLength: maxLength,
        maxLengthMessage: flagMaxlength
      };
      if (this.validateField(value, config)) {
        hasError = true;  // Dừng lại nếu có lỗi
      }
    }

    return hasError;
  }

  validateField(value, config) {
    let trimmedValue = (value !== null && value !== undefined) ? value.toString().trim() : null;

    if (_.isNil(trimmedValue) || _.isEmpty(trimmedValue)) {
      this.validationCreateBook[config.validateFlag].flag = true;
      this.validationCreateBook[config.validateFlag].message = config.validateMessage;
      return true;
    } else if (config.checkMaxLength && trimmedValue.length > config.maxLength) {
      this.validationCreateBook[config.validateFlag].flag = true;
      this.validationCreateBook[config.validateFlag].message = config.maxLengthMessage;
      return true;
    } else {
      this.validationCreateBook[config.validateFlag].flag = false;
      return false;
    }
  }


  validateFullname() {
    let { fullname } = this.checkouts;
    const config = {
      validateFlag: 'fullname',
      validateMessage: 'Họ và tên không được bỏ trống<',
      checkMaxLength: true,
      maxLength: 250,
      maxLengthMessage: 'Họ và tên không được nhập quá 250 ký tự'
    };
    return this.validateField(fullname, config);
  }


  validatePhone() {
    let { phone } = this.checkouts;
    const config = {
      validateFlag: 'phone',
      validateMessage: 'Số điện thoại không được bỏ trống',
      checkMaxLength: true,
      maxLength: 250,
      maxLengthMessage: 'Số điện thoại không được nhập quá 20 ký tự'
    };
    return this.validateField(phone, config);
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
        "weight": 100
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
    this.checkouts.province = event.ProvinceName;
    this.restGhn.getDistrict(event.ProvinceID).subscribe(response => {
      this.district = response.data;
      console.log(response.data);
    })
    this.provinceId = event.ProvinceID;
  }

  districtID:any;
  getWard(event) {
    console.log(event);
    this.districtName = event.DistrictName;
    this.checkouts.district = event.DistrictName
    this.districtID = event.DistrictID;
    this.restGhn.getWard(event.DistrictID).subscribe(response => {
      this.ward = response.data;
      console.log(this.wardCode);
    })
  }

  wardCode;
  selectWard(event){
    this.wardName = event.WardName
    this.checkouts.ward = event.WardName
    this.wardCode = event.WardCode
    console.log(this.districtID);
    this.getShipping(this.districtID);
    this.addressName = this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
    console.log(this.addressName);
  }
}


function getArrayFromSessionStorage() {
  const storedArray = sessionStorage.getItem('cart');
  return storedArray ? JSON.parse(storedArray) : [];
}
