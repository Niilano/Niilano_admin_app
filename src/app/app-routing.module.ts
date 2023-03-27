import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoriesPage } from './pages/categories/categories.page';
import { OrdersPage } from './pages/orders/orders.page';
import { ProductsPage } from './pages/products/products.page';
import { SummaryPage } from './pages/summary/summary.page';
import { UsersPage } from './pages/users/users.page';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
