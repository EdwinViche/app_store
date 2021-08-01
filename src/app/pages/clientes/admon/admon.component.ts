import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styles: [
  ]
})
export class AdmonComponent implements OnInit {

  
  form: FormGroup;
  id = this.actRoute.snapshot.params['id'];  
  detalleCliente: any = {};
  
  btnItemAccion: number = 0; // 1=agregar 2=editar

  crear: boolean;
  editar: boolean;
  ver: boolean;
  

  constructor(
    public clienteService: ClienteService, 
    public router: Router,
    public fb: FormBuilder,
    public actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { 
    this.form = this.fb.group({
      id: [''],     
      nombre: ['', Validators.required], 
      apellido: ['', Validators.required], 
      telefono: ['', Validators.required], 
      nit: ['', Validators.required]
    })
  }

  ngOnInit() {
    //Saber si se creara, editara o unicamente ver
    this.ver = this.clienteService.ver;
    this.editar = this.clienteService.editar;
    this.crear = this.clienteService.crear;

    //Si la accion es crear un nuevo, NO se llena el formulario con valores
    this.crear? this.idCliente() : this.verOrEditar();

  }
  
  //para saber el numero de elementos en clientes y seterarlo en id
  idCliente(){
    this.clienteService.getClientes()
    .subscribe(result => {            
      this.id = result.length;
    });
  } 

  verOrEditar(){
    //Para ver o editar se llena formulario con datos
    this.clienteService.getCliente(this.id).subscribe((data: {}) => {
      
      this.detalleCliente = data;
      
      this.form = this.fb.group({
        id:       [this.detalleCliente.id, Validators.required], 
        nombre:   [this.detalleCliente.nombre, Validators.required], 
        apellido: [this.detalleCliente.apellido, Validators.required], 
        telefono: [this.detalleCliente.telefono, Validators.required], 
        nit:      [this.detalleCliente.nit, Validators.required]
      })

    });
  }

  btnAccion(act: number): void { this.btnItemAccion = act; }

  onSubmit(): void {
    this.btnItemAccion==1? this.crearCliente() : this.modificarCliente() 
  }

  crearCliente() {
    this.clienteService.createCliente(this.form.value).subscribe((data: {}) => {
      this.router.navigate(['/clientes/listado'])
    });
    this._snackBar.open("¡Cliente creado exitosamente!", "Cerrar" ,{duration: 3000} );
  }
  
  modificarCliente() {
    if(window.confirm('Confirma que desea modificar al cliente!?')){
      this.clienteService.updateCliente(this.id, this.form.value).subscribe(data => {
        this.router.navigate(['/clientes/listado'])
      });
      this._snackBar.open("¡Cliente modificado exitosamente!", "Cerrar" ,{duration: 3000} );
    }
    
  }
  
}