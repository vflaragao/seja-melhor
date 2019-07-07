import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicGuard } from '@core/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(mod => mod.SearchModule),
  },
  {
    path: 'foundations',
    loadChildren: () => import('./foundations/foundations.module').then(mod => mod.FoundationsModule),
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./campaigns/campaigns.module').then(mod => mod.CampaignsModule),
  },
  {
    path: 'collectPoint',
    loadChildren: () => import('./collect-point/collect-point.module').then(mod => mod.CollectPointModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(mod => mod.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
