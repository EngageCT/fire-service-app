import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDashboardPageRoutingModule } from './client-dashboard-routing.module';

import { ClientDashboardPage } from './client-dashboard.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientDashboardPageRoutingModule
  ],
  declarations: [ClientDashboardPage]
})
export class ClientDashboardPageModule {}
