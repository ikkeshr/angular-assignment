import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';

import { HttpClientModule } from '@angular/common/http';
import { CreateEventComponent } from './components/create-event/create-event.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SearchBoxComponent,
    EventListComponent,
    EventCardComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatStepperModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
