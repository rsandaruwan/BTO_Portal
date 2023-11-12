import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components


import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { CategoryPopupComponent } from './components/popups/category-popup/category-popup.component';
import { SubCategoryPopupComponent } from './components/popups/sub-category-popup/sub-category-popup.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { AttributePopupComponent } from './components/popups/attribute-popup/attribute-popup.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { IngredientPopupComponent } from './components/popups/ingredient-popup/ingredient-popup.component';
import { DynamicConfirmationPopupComponent } from './components/popups/dynamic-confirmation-popup/dynamic-confirmation-popup.component';
import { DynamicDonePopupComponent } from './components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { AddUserComponent } from './components/popups/add-user/add-user.component';
import { LogoutComponent } from './components/popups/logout/logout.component';
import { VariantsComponent } from './components/variants/variants.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { RecipeCategoryPopupComponent } from './components/popups/recipe-category-popup/recipe-category-popup.component';
import { TestPopupComponent } from './components/popups/test-popup/test-popup.component';


// pages

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavigationComponent } from './pages/side-navigation/side-navigation.component';
import { DynamicDashboardComponent } from './pages/dynamic-dashboard/dynamic-dashboard.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { AttributesComponent } from './pages/attributes/attributes.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { PermissionComponent } from './permission/permission.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AddRecipesComponent } from './pages/add-recipes/add-recipes.component';
import { SingleOrderComponent } from './pages/single-order/single-order.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipeCategoriesComponent } from './pages/recipe-categories/recipe-categories.component';



import { AddProductResultData } from './modals/product_data';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    ResetPasswordComponent,
    VerifyPasswordComponent,
    ConfirmPasswordComponent,
    DashboardComponent,
    SideNavigationComponent,
    DynamicDashboardComponent,
    ProductCategoriesComponent,
    ProductsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    CategoryPopupComponent,
    SubCategoryPopupComponent,
    AddProductsComponent,
    ToggleButtonComponent,
    OrdersComponent,
    AttributesComponent,
    IngredientsComponent,
    AttributePopupComponent,
    ImageUploadComponent,
    UserListComponent,
    PermissionComponent,
    IngredientPopupComponent,
    RecipesComponent,
    AddRecipesComponent,
    DynamicConfirmationPopupComponent,
    DynamicDonePopupComponent,
    SingleOrderComponent,
    CustomerComponent,
    AddUserComponent,
    ProfileComponent,
    LogoutComponent,
    VariantsComponent,
    ProfileDetailsComponent,
    TestPopupComponent,
    RecipeCategoriesComponent,
    RecipeCategoryPopupComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
