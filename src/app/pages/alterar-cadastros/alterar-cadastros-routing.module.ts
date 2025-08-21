import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarCadastrosPage } from './alterar-cadastros.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarCadastrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarCadastrosPageRoutingModule {}
