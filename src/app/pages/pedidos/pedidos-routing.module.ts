import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmonComponent } from './admon/admon.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  {path: '', component: ListadoComponent, pathMatch: 'full'},
  {path: 'listado', component: ListadoComponent},
  {path: 'crear', component: AdmonComponent},
  {path: 'editar/:id', component: AdmonComponent},
  {path: 'ver/:id', component: AdmonComponent},
  { path: '**', redirectTo: 'listado', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
