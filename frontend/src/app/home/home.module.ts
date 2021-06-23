import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { MatSelectModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [HomeComponent, MenuComponent, DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ChartsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule  
  ]
})
export class HomeModule { }
