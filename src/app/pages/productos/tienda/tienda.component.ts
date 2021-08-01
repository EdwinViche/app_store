import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Producto } from '../../../services/producto';
import { ProductoService } from '../../../services/producto.service';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styles: [
  ]
})
export class TiendaComponent implements OnInit {

  customOptions: OwlOptions;

  

  productos: Producto[] = [];
  productos_: Producto[] = [];

  constructor(
    public productoService: ProductoService
  ) { }

  ngOnInit(): void {    
    this.carousel();
    this.cargarProductos();
  }

  cargarProductos(){
    this.productoService.getProductos()
    .subscribe(result => {
      this.productos = result;
      this.ultimosDosProd();
    });
  }

  ultimosDosProd(){   
    this.productos_.push(this.productos[this.productos.length-1]);
    this.productos_.push(this.productos[this.productos.length-2]);
  }

  carousel(){
    this.customOptions = {
      loop: true,
      dots: false,
      autoplay:true,
      autoplaySpeed:1500,
      autoplayTimeout:3000,
      navSpeed: 1000,
      responsiveRefreshRate:0,
      navText: ['&#8249', '&#8250;'],
      responsive: { 
        0: { items: 1 },
        400: { items: 1 },
        760: { items: 1 },
        1000: { items: 1 }
      },
      nav: true
    };
  }

}
