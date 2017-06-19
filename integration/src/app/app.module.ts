import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LibModule } from 'ngx-mime';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, LibModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }