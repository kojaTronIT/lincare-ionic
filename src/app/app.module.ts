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
import { AddressConfirmationComponent } from './address-confirmation/address-confirmation.component';
import { ErrorComponent } from './error/error.component';
import { HomePage } from './home/home.page';
import { EofBlockerComponent } from './eof-blocker/eof-blocker.component';


@NgModule({
  declarations: [AppComponent, ItemSelectComponent, AmountPickerComponent, AddressConfirmationComponent, ErrorComponent, EofBlockerComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({rippleEffect: false, mode: 'ios'}), AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ItemSelectComponent, HomePage, AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
