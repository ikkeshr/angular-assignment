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
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryInputComponent } from './components/category-input/category-input.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { InputDateComponent } from './components/input-date/input-date.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PricingLocationComponent } from './components/stepper-forms/pricing-location/pricing-location.component';
import { CounterComponent } from './components/counter/counter.component';
import { CheckboxPaymentComponent } from './components/checkbox-payment/checkbox-payment.component';
import { AdditionalInfoComponent } from './components/stepper-forms/additional-info/additional-info.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SearchBoxComponent,
    EventListComponent,
    EventCardComponent,
    CreateEventComponent,
    CategoryInputComponent,
    ToggleComponent,
    InputDateComponent,
    ImageUploadComponent,
    PricingLocationComponent,
    CounterComponent,
    CheckboxPaymentComponent,
    AdditionalInfoComponent,
    CheckboxComponent
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
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    NgxDropzoneModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
