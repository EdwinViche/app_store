import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmonComponent } from './admon/admon.component';
import { ListadoComponent } from './listado/listado.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [
  {path: 'tienda', component: TiendaComponent, pathMatch: 'full'},
  {path: 'listado', component: ListadoComponent},
  {path: 'crear', component: AdmonComponent},
  {path: 'editar/:id', component: AdmonComponent},
  {path: 'ver/:id', component: AdmonComponent},
  { path: '**', redirectTo: 'tienda', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
