import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/services/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [ 'th{width:16.66667%;}' ]
})
export class ListadoComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    public clienteService: ClienteService,
    private _snackBar: MatSnackBar) { }  

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono', 'nit', 'admin'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
  
  ngOnInit(): void {
    this.cargarClientes(); 
  }

  //Accion a realizar 1=crear, 2=ver, 3=editar
  btnAccion(act: number){
    this.clienteService.crear  = false;
    this.clienteService.ver = false;
    this.clienteService.editar = false;
    
    switch(act){
      case 1: { this.clienteService.crear = true; break; }
      case 2: { this.clienteService.ver = true; break; }
      case 3: { this.clienteService.editar = true; break; }
    } 
  }

  cargarClientes(){
    this.clienteService.getClientes()
    .subscribe(result => {
      this.clientes = result;
      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  eliminarCliente(id: number) {
    if (window.confirm('Seguro que quieres eliminar el cliente')){
      this.clienteService.deleteCliente(id).subscribe(data => {
        this.cargarClientes()
      });
      this._snackBar.open("¡Cliente eliminado exitosamente!", "Cerrar" ,{duration: 3000} );
    }
  }  

}