import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // =========================
  // AUTH LAYOUT (LOGIN AREA)
  // =========================
  {
    path: '',
    canActivate: [isLoggedGuard],
    loadComponent: () =>
      import('./core/layouts/auth-layout/auth-layout.component')
        .then(c => c.AuthLayoutComponent),

    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component')
            .then(c => c.LoginComponent),
        title: 'login page'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component')
            .then(c => c.RegisterComponent),
        title: 'register page'
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./core/auth/forget-password/forget-password.component')
            .then(c => c.ForgetPasswordComponent),
        title: 'forget password page'
      }
    ]
  },

  // =========================
  // MAIN LAYOUT
  // =========================
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/blank-layout/blank-layout.component')
        .then(c => c.BlankLayoutComponent),

    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component')
            .then(c => c.HomeComponent),
        title: 'home'
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component')
            .then(c => c.ProductsComponent),
        canActivate: [authGuardGuard],
        title: 'products'
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component')
            .then(c => c.BrandsComponent),
        canActivate: [authGuardGuard],
        title: 'brands'
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component')
            .then(c => c.CartComponent),
        canActivate: [authGuardGuard],
        title: 'cart'
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component')
            .then(c => c.DetailsComponent),
        //  canActivate: [authGuardGuard],
        title: 'details'
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component')
            .then(c => c.DetailsComponent),
        //  canActivate: [authGuardGuard],
        title: 'details'
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component')
            .then(c => c.CheckoutComponent),
        title: 'checkout'
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wish-list/wish-list.component')
            .then(c => c.WishListComponent),
        canActivate: [authGuardGuard],
        title: 'wishlist'
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component')
            .then(c => c.CategoriesComponent),
        canActivate: [authGuardGuard],
        title: 'categories'
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component')
            .then(c => c.AllordersComponent),
            canActivate: [authGuardGuard],
        title: 'all orders'
      },
      { path: 'products/:id', 
        loadComponent: () =>
          import('./features/products/products.component')
            .then(c => c.ProductsComponent),
        //  canActivate: [authGuardGuard],
        title: 'product'
       }
    ]
  },

  // =========================
  // NOT FOUND
  // =========================
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component')
        .then(c => c.NotfoundComponent),
    title: 'Page Not Found'
  }
];
