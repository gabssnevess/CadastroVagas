import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarCadastrosPageRoutingModule } from './alterar-cadastros-routing.module';

import { AlterarCadastrosPage } from './alterar-cadastros.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarCadastrosPageRoutingModule,
    HeaderComponent
  ],
  declarations: [AlterarCadastrosPage]
})
export class AlterarCadastrosPageModule {}
