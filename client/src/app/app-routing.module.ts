import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
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
    path: '',
    loadChildren: () => import('./main/main.module').then(mod => mod.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
