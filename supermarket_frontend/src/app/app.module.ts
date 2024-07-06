import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './Layouts/Admin/admin-header/admin-header.component';
import { AdminMainComponent } from './Layouts/Admin/admin-main/admin-main.component';
import { AdminFooterComponent } from './Layouts/Admin/admin-footer/admin-footer.component';
import { CustomerHeaderComponent } from './Layouts/Customer/customer-header/customer-header.component';
import { CustomerMainComponent } from './Layouts/Customer/customer-main/customer-main.component';
import { CustomerFooterComponent } from './Layouts/Customer/customer-footer/customer-footer.component';
import { AdminBrandComponent } from './Component/Admin/admin-brand/admin-brand.component';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './Component/Admin/admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './Component/Customer/customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './Component/Customer/customer-home/customer-home.component';
import { AdminCategoryComponent } from './Component/Admin/admin-category/admin-category.component';
import { LoginComponent } from './Component/Authenticate/login/login.component';
import { RegisterComponent } from './Component/Authenticate/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from './Services/brand.service';
import { AdminBrandCreateComponent } from './Component/Admin/admin-brand-create/admin-brand-create.component';
import { AdminBrandUpdateComponent } from './Component/Admin/admin-brand-update/admin-brand-update.component';
import { AdminCategoryCreateComponent } from './Component/Admin/admin-category-create/admin-category-create.component';
import { AdminCategoryUpdateComponent } from './Component/Admin/admin-category-update/admin-category-update.component';
import { AdminProductComponent } from './Component/Admin/admin-product/admin-product.component';
import { AdminProductCreateComponent } from './Component/Admin/admin-product-create/admin-product-create.component';
import { AdminProductUpdateComponent } from './Component/Admin/admin-product-update/admin-product-update.component';
import { AdminProductImageCreateComponent } from './Component/Admin/admin-product-image-create/admin-product-image-create.component';
import { AdminAttributeComponent } from './Component/Admin/admin-attribute/admin-attribute.component';
import { AdminAttributeValueCreateComponent } from './Component/Admin/admin-attribute-value-create/admin-attribute-value-create.component';
import { AdminAttributeValueUpdateComponent } from './Component/Admin/admin-attribute-value-update/admin-attribute-value-update.component';
import { AdminAttributeCreateComponent } from './Component/Admin/admin-attribute-create/admin-attribute-create.component';
import { AdminAttributeUpdateComponent } from './Component/Admin/admin-attribute-update/admin-attribute-update.component';
import { AdminAttributeValueComponent } from './Component/Admin/admin-attribute-value/admin-attribute-value.component';
import { CustomerFeatureProductComponent } from './Component/Customer/customer-feature-product/customer-feature-product.component';
import { ShowProductComponent } from './Component/Customer/show-product/show-product.component';
import { ListProductByCategoryComponent } from './Component/Customer/list-product-by-category/list-product-by-category.component';
import { CartComponent } from './Component/Customer/cart/cart.component';
import { OrderComponent } from './Component/Customer/order/order.component';
import { PaymentResultComponent } from './Component/Customer/payment-result/payment-result.component';
import { OrderListComponent } from './Component/Customer/order-list/order-list.component';
import { OrderDetailComponent } from './Component/Customer/order-detail/order-detail.component';
import { AdminOrderComponent } from './Component/Admin/admin-order/admin-order.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminMainComponent,
    AdminFooterComponent,
    CustomerHeaderComponent,
    CustomerMainComponent,
    CustomerFooterComponent,
    CustomerFeatureProductComponent,
    AdminBrandComponent,
    AdminHomeComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent,
    CustomerHomeComponent,
    AdminCategoryComponent,
    LoginComponent,
    RegisterComponent,
    AdminBrandCreateComponent,
    AdminBrandUpdateComponent,
    AdminCategoryCreateComponent,
    AdminCategoryUpdateComponent,
    AdminProductComponent,
    AdminProductCreateComponent,
    AdminProductUpdateComponent,
    AdminProductImageCreateComponent,
    AdminAttributeComponent,
    AdminAttributeValueComponent,
    AdminAttributeValueCreateComponent,
    AdminAttributeValueUpdateComponent,
    AdminAttributeCreateComponent,
    AdminAttributeUpdateComponent,
    CustomerFeatureProductComponent,
    ShowProductComponent,
    ListProductByCategoryComponent,
    CartComponent,
    OrderComponent,
    PaymentResultComponent,
    OrderListComponent,
    OrderDetailComponent,
    AdminOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BrandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
