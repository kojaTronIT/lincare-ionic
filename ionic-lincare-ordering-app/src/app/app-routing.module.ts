import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AmountPickerComponent } from './amount-picker/amount-picker.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { ErrorComponent } from './error/error.component';
import { ItemSelectComponent } from './item-select/item-select.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'dummy',
    pathMatch: 'full'
  },
  {
    path: 'item-select',
    component: ItemSelectComponent
  },
  {
    path: 'message',
    component: ErrorComponent
  },
  {
    path: 'amount-picker',
    component: AmountPickerComponent
  },
  {
    path: 'dummy',
    component: DummyPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
