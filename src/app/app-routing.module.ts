import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'productos', pathMatch: 'full'},
  {path: 'clientes', loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)},
  {path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule)},
  {path: 'pedidos', loadChildren: () => import('./pages/pedidos/pedidos.module').then(m => m.PedidosModule)},
  { path: '**', redirectTo: 'listado', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
