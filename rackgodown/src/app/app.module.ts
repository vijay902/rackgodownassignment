import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RackListComponent } from './rack-list/rack-list.component';
import { RackAddComponent } from './rack-add/rack-add.component';
import { RackEditComponent } from './rack-edit/rack-edit.component';
import { GodownListComponent } from './godown-list/godown-list.component';
import { GodownAddComponent } from './godown-add/godown-add.component';
import { GodownEditComponent } from './godown-edit/godown-edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    RackListComponent,
    RackAddComponent,
    RackEditComponent,
    GodownListComponent,
    GodownAddComponent,
    GodownEditComponent,
    NavbarComponent,
    ConfirmationdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
