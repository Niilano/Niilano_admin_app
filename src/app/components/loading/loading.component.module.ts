import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports : [
    LoadingComponent
  ]
})
export class LoadingModule { }
