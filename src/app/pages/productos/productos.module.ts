import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { AdmonComponent } from './admon/admon.component';
import { TiendaComponent } from './tienda/tienda.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    ListadoComponent,
    AdmonComponent,
    TiendaComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
    CarouselModule
  ]
})
export class ProductosModule { }
