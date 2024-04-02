import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { PublicComponent } from './component/public/public.component';
import { RegisterAccountComponent } from './component/register-account/register-account.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { CartComponent } from './component/cart/cart.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { GhnInterceptor } from './_helper/ghn.interceptor';
import { ProductDetailComponent } from './component/view-product/product-detail/product-detail.component';
import { CheckoutProductComponent } from './component/checkout-product/checkout-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ListOrderComponent } from './component/Order/list-order/list-order.component';
import { ListOrderCancelComponent } from './component/Order/list-order-cancel/list-order-cancel.component';
import { ListOrderShippingComponent } from './component/Order/list-order-shipping/list-order-shipping.component';
import { ListOrderShipSuccessComponent } from './component/Order/list-order-ship-success/list-order-ship-success.component';
import { ListOrderConfirmComponent } from './component/Order/list-order-confirm/list-order-confirm.component';


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    AuthenticationComponent,

    PublicComponent,
    RegisterAccountComponent,

    ViewProductComponent,
    CartComponent,
    ProductDetailComponent,
    CheckoutProductComponent,
    PaginationComponent,

    ListOrderComponent,
    ListOrderCancelComponent,
    ListOrderShippingComponent,
    ListOrderShipSuccessComponent,
    ListOrderConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgSelectModule,

    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    ToastrService,
    BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GhnInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
