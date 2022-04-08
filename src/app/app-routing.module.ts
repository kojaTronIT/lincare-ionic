import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddressConfirmationComponent } from './address-confirmation/address-confirmation.component';
import { AmountPickerComponent } from './amount-picker/amount-picker.component';
import { DeliveryDateComponent } from './delivery-date/delivery-date.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { ErrorComponent } from './error/error.component';
import { RoutesGuardGuard } from './guards/routes.guard';
import { ItemSelectComponent } from './item-select/item-select.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'item-select',
    component: ItemSelectComponent,
    canActivate: [RoutesGuardGuard]
  },
  {
    path: 'message',
    component: ErrorComponent
  },
  {
    path: 'amount-picker',
    component: AmountPickerComponent,
    canActivate: [RoutesGuardGuard]
  },
  {
    path: 'dummy',
    component: DummyPageComponent,
    canActivate: [RoutesGuardGuard]
  },
  {
    path: 'address-confirmation',
    component: AddressConfirmationComponent,
    canActivate: [RoutesGuardGuard]
  },
  {
    path: 'delivery-date',
    component: DeliveryDateComponent,
    canActivate: [RoutesGuardGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
