import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';
import { AdminBrandComponent } from './Component/Admin/admin-brand/admin-brand.component';
import { AdminLayoutComponent } from './Component/Admin/admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './Component/Customer/customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './Component/Customer/customer-home/customer-home.component';
import { AdminCategoryComponent } from './Component/Admin/admin-category/admin-category.component';
import { LoginComponent } from './Component/Authenticate/login/login.component';
import { RegisterComponent } from './Component/Authenticate/register/register.component';
import { AdminBrandCreateComponent } from './Component/Admin/admin-brand-create/admin-brand-create.component';
import { AdminBrandUpdateComponent } from './Component/Admin/admin-brand-update/admin-brand-update.component';
import { AdminCategoryCreateComponent } from './Component/Admin/admin-category-create/admin-category-create.component';
import { AdminCategoryUpdateComponent } from './Component/Admin/admin-category-update/admin-category-update.component';
import { AdminProductComponent } from './Component/Admin/admin-product/admin-product.component';
import { AdminProductCreateComponent } from './Component/Admin/admin-product-create/admin-product-create.component';
import { AdminProductUpdateComponent } from './Component/Admin/admin-product-update/admin-product-update.component';
import { AdminProductImageCreateComponent } from './Component/Admin/admin-product-image-create/admin-product-image-create.component';
import { AdminAttributeComponent } from './Component/Admin/admin-attribute/admin-attribute.component';
import { AdminAttributeCreateComponent } from './Component/Admin/admin-attribute-create/admin-attribute-create.component';
import { AdminAttributeUpdateComponent } from './Component/Admin/admin-attribute-update/admin-attribute-update.component';
import { AdminAttributeValueCreateComponent } from './Component/Admin/admin-attribute-value-create/admin-attribute-value-create.component';
import { AdminAttributeValueUpdateComponent } from './Component/Admin/admin-attribute-value-update/admin-attribute-value-update.component';
import { AdminAttributeValueComponent } from './Component/Admin/admin-attribute-value/admin-attribute-value.component';
import { ShowProductComponent } from './Component/Customer/show-product/show-product.component';
import { ListProductByCategoryComponent } from './Component/Customer/list-product-by-category/list-product-by-category.component';
import { CartComponent } from './Component/Customer/cart/cart.component';
import { OrderComponent } from './Component/Customer/order/order.component';
import { PaymentResultComponent } from './Component/Customer/payment-result/payment-result.component';
import { OrderDetailComponent } from './Component/Customer/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect root to /home
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'brand', component: AdminBrandComponent },
      { path: 'brand/create', component: AdminBrandCreateComponent },
      { path: 'brand/update/:id', component: AdminBrandUpdateComponent },
      { path: 'category', component: AdminCategoryComponent},
      { path: 'category/create', component: AdminCategoryCreateComponent},
      { path: 'category/update/:id', component: AdminCategoryUpdateComponent},
      { path: 'product', component: AdminProductComponent},
      { path: 'product/create', component: AdminProductCreateComponent},
      { path: 'product/update/:id', component: AdminProductUpdateComponent},
      { path: 'product/image/create/:productId', component: AdminProductImageCreateComponent},
      { path: 'attribute', component: AdminAttributeComponent},
      { path: 'attribute/create', component: AdminAttributeCreateComponent},
      { path: 'attribute/update/:id', component: AdminAttributeUpdateComponent},
      { path: 'product/attribute_value/:productId', component: AdminAttributeValueComponent},
      { path: 'product/attribute_value/create/:productId', component: AdminAttributeValueCreateComponent},
      { path: 'product/attribute_value/update/:productId/:id', component: AdminAttributeValueUpdateComponent},
    ],
  },
  {
    path: '',
    children: [
      { path: '', component: CustomerHomeComponent }, // Default route within CustomerLayoutComponent
      { path: 'showProduct/:id', component: ShowProductComponent },
      { path: 'showProductbyCategory/:id', component: ListProductByCategoryComponent},
      { path: 'cart', component: CartComponent},
      { path: 'order', component: OrderComponent},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'orderdetails', component: OrderDetailComponent },  
      { path: 'payment/result', component: PaymentResultComponent}
    ],
    component: CustomerLayoutComponent,
  },
  { path: '**', redirectTo: 'home' } // Redirect any unknown paths to /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
