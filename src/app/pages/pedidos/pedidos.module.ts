import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { AdmonComponent } from './admon/admon.component';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    AdmonComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
