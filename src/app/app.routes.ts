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
        .then(m => m.AuthLayoutComponent),

    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component')
            .then(m => m.LoginComponent),
        title: 'login page'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component')
            .then(m => m.RegisterComponent),
        title: 'register page'
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./core/auth/forget-password/forget-password.component')
            .then(m => m.ForgetPasswordComponent),
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
        .then(m => m.BlankLayoutComponent),

    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component')
            .then(m => m.HomeComponent),
        title: 'home'
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component')
            .then(m => m.ProductsComponent),
        canActivate: [authGuardGuard],
        title: 'products'
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component')
            .then(m => m.BrandsComponent),
        canActivate: [authGuardGuard],
        title: 'brands'
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component')
            .then(m => m.CartComponent),
        canActivate: [authGuardGuard],
        title: 'cart'
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component')
            .then(m => m.DetailsComponent),
        canActivate: [authGuardGuard],
        title: 'details'
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component')
            .then(m => m.DetailsComponent),
        canActivate: [authGuardGuard],
        title: 'details'
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component')
            .then(m => m.CheckoutComponent),
        title: 'checkout'
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wish-list/wish-list.component')
            .then(m => m.WishListComponent),
        canActivate: [authGuardGuard],
        title: 'wishlist'
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component')
            .then(m => m.CategoriesComponent),
        canActivate: [authGuardGuard],
        title: 'categories'
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component')
            .then(m => m.AllordersComponent),
        title: 'all orders'
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
        .then(m => m.NotfoundComponent),
    title: 'Page Not Found'
  }
];
