import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartModel } from 'src/app/_model/CartModel';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { ProductService } from 'src/app/_service/product-service/product.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: CartModel[] = [];
  totalAmount: number = 0;
  quantityCart: number = 0;
  quantity!: number;
  voucher!: string;
  amount!: number;
  code: any;
  value: any;

  constructor(
    private cartSer: CartService,
    private toast: ToastrService,
    private proSer: ProductService,
    private app: AppComponent,
  ) { }

  ngOnInit(): void {
    this.getCartByUser();
    this.getSumTotal();
  }

  getCartByUser() {
    this.cartSer.getAllCartByUser()
      .subscribe(data => {
        this.carts = data.data;
      });
  }

  getSumTotal() {
    this.cartSer.getSumTotal()
      .subscribe(data => {
        this.totalAmount = data.data.totalAmount;
        this.quantityCart = data.data.quantityCart;
      });
  }

  plusQuantityCart(cart: any) {
    cart.quantity++;
    this.proSer.getOneProduct(cart.product_id)
    .subscribe(data => {
      if (cart.quantity > data.data.quantity) {
        this.toast.warning('Số lượng vượt quá số lượng trong kho!');
        this.ngOnInit();
      } else {
        this.cartSer.updateCart(cart.product_id, cart)
        .subscribe(data => {
           this.ngOnInit();
        });
      }
    });

  }

  minusQuantityCart(cart: any) {
    cart.quantity--;
    if (cart.quantity < 1) {
      this.toast.warning('Số lượng sản phẩm phải lớn hơn 0!');
        this.ngOnInit();
    } else {
      this.cartSer.updateCart(cart.product_id, cart)
      .subscribe(data => {
        this.ngOnInit();
      });
    }
  }

  updateCart(cart: any) {
    if (cart.quantity < 1) {
      this.toast.warning('Số lượng sản phẩm phải lớn hơn 0!');
      this.ngOnInit();
    } else if (cart.quantity >= 'a' && cart.quantity <= 'z' || cart.quantity >= 'A' && cart.quantity <= 'Z') {
      this.toast.warning('Số lượng sản phẩm phải là số!',);
      this.ngOnInit();
    } else {
      this.proSer.getOneProduct(cart.product_id)
        .subscribe(data => {
          if (cart.quantity > data.data.quantity) {
            this.toast.warning('Số lượng vượt quá số lượng trong kho!');
            this.ngOnInit();
          } else {
            this.cartSer.updateCart(cart.product_id, cart)
              .subscribe(data => {
                this.ngOnInit();
              });
          }
        });
    }
  }

  deleteCart(cart: any) {
    const swalWithBootstrapButtons ={
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }

    this.cartSer.deleteCart(cart.product_id)
      .subscribe(data => {
        this.toast.success('Xóa sản phẩm khỏi giỏ hàng thành công!',);
        this.ngOnInit();
      });
  }
    
  

}
