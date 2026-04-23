import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/features/users/login/login.component';
import { RegisterComponent } from '../app/features/users/register/register.component';
import { ListProductComponent } from '../app/features/products/list-product/list-product.component';
import { FormProductComponent } from './features/products/form-product/form-product.component';
import { ProfileComponent } from './features/users/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-product', component: FormProductComponent },
  { path: 'products', component: ListProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
