import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemSelectComponent } from './item-select/item-select.component';
import { AmountPickerComponent } from './amount-picker/amount-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AddressConfirmationComponent } from './address-confirmation/address-confirmation.component';
import { ErrorComponent } from './error/error.component';
import { HomePage } from './home/home.page';


@NgModule({
  declarations: [AppComponent, ItemSelectComponent, AmountPickerComponent, DummyPageComponent, AddressConfirmationComponent, ErrorComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ItemSelectComponent, HomePage],
  bootstrap: [AppComponent],
})
export class AppModule {}
