import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styles: [
  ]
})
export class AdmonComponent implements OnInit {

  form: FormGroup;
  id = this.actRoute.snapshot.params['id'];  
  detalleProducto: any = {};
  
  btnItemAccion: number = 0; // 1=agregar 2=editar

  crear: boolean;
  editar: boolean;
  ver: boolean;

  constructor(
    public productoService: ProductoService, 
    public router: Router,
    public fb: FormBuilder,
    public actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: [''],     
      nombre: ['', Validators.required], 
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required], 
      precio: ['', Validators.required], 
      url: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    //Saber si se creara, editara o unicamente ver
    this.ver = this.productoService.ver;
    this.editar = this.productoService.editar;
    this.crear = this.productoService.crear;

    //Si la accion es crear un nuevo, NO se llena el formulario con valores
    this.crear? this.idProducto() : this.verOrEditar();
  }

  //para saber el numero de elementos en productos y seterarlo en id
  idProducto(){
    this.productoService.getProductos()
    .subscribe(result => {            
      this.id = result.length;
    });
  } 

  verOrEditar(){
    //Para ver o editar se llena formulario con datos
    this.productoService.getProducto(this.id).subscribe((data: {}) => {
      
      this.detalleProducto = data;
      
      this.form = this.fb.group({
        id: [this.detalleProducto.id, Validators.required],     
        nombre: [this.detalleProducto.nombre, Validators.required], 
        descripcion: [this.detalleProducto.descripcion, Validators.required],
        categoria: [this.detalleProducto.categoria, Validators.required], 
        precio: [this.detalleProducto.precio, Validators.required], 
        url: [this.detalleProducto.url, Validators.required]       
      })

    });
  }

  btnAccion(act: number): void { this.btnItemAccion = act; }

  onSubmit(): void {
    this.btnItemAccion==1? this.crearProducto() : this.modificarProducto() 
  }

  crearProducto() {
    this.productoService.createProducto(this.form.value).subscribe((data: {}) => {
      this.router.navigate(['/productos/listado'])
    });
    this._snackBar.open("Producto creado exitosamente!", "Cerrar" ,{duration: 3000} );
  }
  
  modificarProducto() {
    if(window.confirm('Confirma que desea modificar el producto!?')){
      this.productoService.updateProducto(this.id, this.form.value).subscribe(data => {
        this.router.navigate(['/productos/listado'])
      });
      this._snackBar.open("¡Producto modificado exitosamente!", "Cerrar" ,{duration: 3000} );
    }
    
  }

}
