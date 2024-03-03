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
      ],
    },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
