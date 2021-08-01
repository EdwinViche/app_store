import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../../services/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [ 'th{width:16.66667%}'
  ]
})
export class ListadoComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    public productoService: ProductoService,
    private _snackBar: MatSnackBar
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'admin'];
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
    this.cargarProductos(); 
  }

  //Accion a realizar 1=crear, 2=ver, 3=editar
  btnAccion(act: number){
    this.productoService.crear  = false;
    this.productoService.ver = false;
    this.productoService.editar = false;
    
    switch(act){
      case 1: { this.productoService.crear = true; break; }
      case 2: { this.productoService.ver = true; break; }
      case 3: { this.productoService.editar = true; break; }
    } 
  }

  cargarProductos(){
    this.productoService.getProductos()
    .subscribe(result => {
      this.productos = result;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  eliminarProducto(id: number) {
    if (window.confirm('Seguro que quieres eliminar el producto')){
      this.productoService.deleteProducto(id).subscribe(data => {
        this.cargarProductos()
      });
      this._snackBar.open("¡Producto eliminado exitosamente!", "Cerrar" ,{duration: 3000} );
    }
  }

}
