import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartModel } from 'src/app/_model/CartModel';
import { CartService } from 'src/app/_service/cart-service/cart.service';
import { ProductService } from 'src/app/_service/product-service/product.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
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

  listCartNoneLogin: [];

  constructor(
    private cartSer: CartService,
    private toast: ToastrService,
    private proSer: ProductService,
    private app: AppComponent,
    private localStore: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getCartByUser();
    this.getSumTotal();
  }

  getCartByUser() {
    const user  = this.localStore.getUser()
    if(user === null || user === '' || user === undefined){
      this.listCartNoneLogin = getArrayFromSessionStorage();
      this.listCartNoneLogin.forEach((item:any) => {
        this.proSer.getByProductId(item.productId).subscribe(res=>{
          const product = res.data.data;
          const cart = {
            id: 1,
            name: product.name,
            price: product.priceNew,
            quantity: 1,
            total: product.priceNew * 1,
            image: product.imgList,
            product_id: product.id,
            productId: product.id,
            sizeName: item.sizeName,
            colorName: item.colorName,
            userId: 1
          }
          this.carts.push(cart);
          this.totalAmount += product.priceNew;
          this.quantityCart += cart.quantity;
          sessionStorage.setItem('cart', JSON.stringify(this.carts));
        })
      })
      console.log(this.carts);
    }else{
      this.cartSer.getAllCartByUser()
      .subscribe(data => {
        this.carts = data.data;
      });
    }
  }

  getSumTotal() {
    const user  = this.localStore.getUser()
    if(user === null || user === '' || user === undefined){
      return;
    }
    this.cartSer.getSumTotal()
      .subscribe(data => {
        this.totalAmount = data.data.totalAmount;
        this.quantityCart = data.data.quantityCart;
      });
  }

  plusQuantityCart(cart: any) {
    if(cart.quantity >= 3){
      this.toast.warning('Bạn chỉ được đặt tối 3 sản phẩm !');
      return;
    }
    const user  = this.localStore.getUser()
    if(user === null || user === '' || user === undefined){

      const updatedCarts = this.carts.map((item: any) => {
        if (item.productId === cart.productId) {
          item.quantity += 1;
          item.total = item.price * item.quantity; // Cập nhật lại tổng giá trị
        
          this.totalAmount += item.price;
          this.quantityCart += 1;
        }
        return item;
      });
  
      this.carts = updatedCarts;
      sessionStorage.setItem('cart', JSON.stringify(this.carts));

    }else{
      cart.quantity++;
      this.proSer.getOneProduct(cart.product_id)
      .subscribe(data => {
        if (cart.quantity > data.data.quantity) {
          this.toast.warning('Số lượng vượt quá số lượng trong kho!');
          this.ngOnInit();
          this.getSumTotal();
        } else {
          this.cartSer.updateCart(cart.product_id, cart)
          .subscribe(data => {
             this.ngOnInit();
             this.getSumTotal();2
          });
        }
      });
    }
  }

  minusQuantityCart(cart: any) {
    if(cart.quantity <= 1){
      return;
    }
    const user  = this.localStore.getUser()
    if(user === null || user === '' || user === undefined){
      const updatedCarts = this.carts.map((item: any) => {
        if (item.productId === cart.productId) {
          item.quantity -= 1;
          item.total = item.price * item.quantity; // Cập nhật lại tổng giá trị
        
          this.totalAmount -= item.price;
          this.quantityCart -= 1;
        }
        return item;
      });
  
      this.carts = updatedCarts;
      sessionStorage.setItem('cart', JSON.stringify(this.carts));

    }else{
      cart.quantity--;
      if (cart.quantity < 1) {
        this.toast.warning('Số lượng sản phẩm phải lớn hơn 0!');
          this.ngOnInit();
          this.getSumTotal();
      } else {
        this.cartSer.updateCart(cart.product_id, cart)
        .subscribe(data => {
          this.ngOnInit();
          this.getSumTotal();
        });
      }
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
    const user  = this.localStore.getUser()
    if(user === null || user === '' || user === undefined){
      // Lọc ra những mục không có id là productId
      this.carts = this.carts.filter(item => item.productId !== cart.productId);
        
      // Cập nhật lại sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(this.carts));
    }else{
      this.cartSer.deleteCart(cart.product_id)
      .subscribe(data => {
        this.toast.success('Xóa sản phẩm khỏi giỏ hàng thành công!',);
        this.ngOnInit();
      });
    }
  }

}

function getArrayFromSessionStorage() {
  const storedArray = sessionStorage.getItem('cart');
  return storedArray ? JSON.parse(storedArray) : [];
}
