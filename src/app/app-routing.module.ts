import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './component/public/public.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterAccountComponent } from './component/register-account/register-account.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { HomeComponent } from './component/home/home.component';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { ProductDetailComponent } from './component/view-product/product-detail/product-detail.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutProductComponent } from './component/checkout-product/checkout-product.component';
import { ListOrderComponent } from './component/Order/list-order/list-order.component';
import { ListOrderCancelComponent } from './component/Order/list-order-cancel/list-order-cancel.component';
import { ListOrderShippingComponent } from './component/Order/list-order-shipping/list-order-shipping.component';
import { ListOrderShipSuccessComponent } from './component/Order/list-order-ship-success/list-order-ship-success.component';
import { ListOrderConfirmComponent } from './component/Order/list-order-confirm/list-order-confirm.component';
import { ListOrderDetailComponent } from './component/OrderDetail/list-order-detail/list-order-detail.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: PublicComponent, children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register-account',
      component: RegisterAccountComponent
    },
    {
      path: 'home',
      component: AuthenticationComponent,
      children: [
        {
          path: '',
          component: HomeComponent,
        },
        {
          path: 'product',
          component: ViewProductComponent,
        },
        {
          path: 'product-detail/:id',
          component: ProductDetailComponent,
        },
        {
          path: 'cart',
          component: CartComponent,
        },
        {
          path:'checkout', 
          component: CheckoutProductComponent
        },

        {path:'order-detail/:id', component: ListOrderDetailComponent},

        {path:'list-order', component: ListOrderComponent},
        {path:'list-order-cancel', component: ListOrderCancelComponent},
        {path:'list-order-shipping', component: ListOrderShippingComponent},
        {path:'list-order-ship-success', component: ListOrderShipSuccessComponent},
        {path:'list-order-confirm', component: ListOrderConfirmComponent},
      ],
    },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
