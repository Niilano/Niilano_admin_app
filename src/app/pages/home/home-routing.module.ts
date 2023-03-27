import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', loadChildren: () => import('../summary/summary.module').then( m => m.SummaryPageModule) },
      { path: 'summary', loadChildren: () => import('../summary/summary.module').then( m => m.SummaryPageModule) },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'categories/:subcatid',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),RouterModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
