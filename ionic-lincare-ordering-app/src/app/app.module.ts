import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemSelectComponent } from './item-select/item-select.component';
import { AmountPickerComponent } from './amount-picker/amount-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { DummyPageComponent } from './dummy-page/dummy-page.component';

@NgModule({
  declarations: [AppComponent, ItemSelectComponent, AmountPickerComponent, DummyPageComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ItemSelectComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
