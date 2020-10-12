import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';

import {MatButtonModule} from '@angular/material/button';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { IconComponent } from './components/icon/icon.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SearchBoxComponent,
    IconComponent,
    EventListComponent,
    EventCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
