import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteMasterPageRoutingModule } from './write-master-routing.module';

import { WriteMasterPage } from './write-master.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WriteMasterPageRoutingModule
  ],
  declarations: [WriteMasterPage]
})
export class WriteMasterPageModule {}
