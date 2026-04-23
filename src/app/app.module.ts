import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormProductComponent } from './features/products/form-product/form-product.component';
import { ListProductComponent } from './features/products/list-product/list-product.component';
import { RegisterComponent } from './features/users/register/register.component';
import { LoginComponent } from './features/users/login/login.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { ProfileComponent } from './features/users/profile/profile.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { CartItemComponent } from './features/cart/cart-item/cart-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductCardComponent } from './features/products/product-card/product-card.component';
import { OrderSummaryComponent } from './features/orders/order-summary/order-summary.component';
import { CheckoutComponent } from './features/orders/checkout/checkout.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormProductComponent,
    ListProductComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    ProfileComponent,
    CartComponent,
    CartItemComponent,
    ProductDetailComponent,
    ProductCardComponent,
    OrderSummaryComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
