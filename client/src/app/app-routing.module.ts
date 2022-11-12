import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './modules/products/pages/add-product/add-product.component';
import { ProductDetailComponent } from './modules/products/pages/product-detail/product-detail.component';
import { ProductsComponent } from './modules/products/pages/products/products.component';
import { LoginPageComponent } from './modules/auth/pages/sign-in/login-page.component';
import { SignUpComponent } from './modules/auth/pages/sign-up/sign-up.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SignPageGuard } from './shared/guards/sign-page.guard';


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'products/add', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: LoginPageComponent, canActivate: [SignPageGuard]},
  {path: 'sign-up', component: SignUpComponent},
  {path: '**', redirectTo: 'sign-in'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
