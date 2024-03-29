import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrobesFunctionalPageRoutingModule } from './strobes-functional-routing.module';

import { StrobesFunctionalPage } from './strobes-functional.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StrobesFunctionalPageRoutingModule
  ],
  declarations: [StrobesFunctionalPage]
})
export class StrobesFunctionalPageModule {}
