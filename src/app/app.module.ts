import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutesComponent } from './components/routes/routes.component';
import {
  AlsDividerGroupModule,
  AlsDoubleSlideToggleModule,
  AlsGridModule,
  AlsIconModule,
  AlsInputModule,
  AlsSlideToggleModule,
} from '@monitorsoft/als-ui';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RoutesDialogContentComponent } from './components/routes/routes-dialog-content/routes-dialog-content.component';
import { MatMenuModule } from '@angular/material/menu';
import { RoutesTableComponent } from './components/routes/routes-table/routes-table.component';
import { RoutesDialogInfoComponent } from './components/routes/routes-dialog-info/routes-dialog-info.component';
import { RoutesApi } from './services/api.service';
import { RoutesFacade } from './routes-facade.service';
import { RoutesState } from './services/state.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LabelClickCrutchDirective } from './directives/label-click-crutch.directive';
import { LabelBlurCrutchDirective } from './directives/label-blur-crutch.directive';

@NgModule({
  declarations: [
    AppComponent,
    RoutesComponent,
    RoutesDialogContentComponent,
    RoutesTableComponent,
    RoutesDialogInfoComponent,
    LabelClickCrutchDirective,
    LabelBlurCrutchDirective,
  ],
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
    MatDialogModule,
    AlsIconModule,
    AlsGridModule,
    MatMenuModule,
    AlsSlideToggleModule,
    AlsDoubleSlideToggleModule,
    AlsDividerGroupModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [RoutesApi, RoutesFacade, RoutesState],
  bootstrap: [AppComponent],
})
export class AppModule {}
