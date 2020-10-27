import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutesComponent } from './components/routes/routes.component';
import { AlsIconModule, AlsInputModule } from '@monitorsoft/als-ui';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, RoutesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AlsInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    AlsIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
