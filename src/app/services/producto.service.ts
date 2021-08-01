import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from './producto';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  ver: boolean = false;
  editar: boolean = false;
  crear: boolean = false;

  public urlApi: string = "http://localhost:3000/productos/";

  constructor(private http: HttpClient) { }

  // Obtiene el listado completo de productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlApi)
    .pipe(retry(1), catchError(this.handleError))
  }

  // Obtiene producto vía id
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.urlApi + id)
    .pipe(retry(1), catchError(this.handleError))
  }  

  // Crea un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlApi, 
      JSON.stringify(producto), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }  

  // Modificar un producto vía id 
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.urlApi + id, 
      JSON.stringify(producto), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  // Elimina un producto vía id
  deleteProducto(id: number){
    return this.http.delete<Producto>(this.urlApi + id, this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }
  
  /* *********************************************************** */
  
  // Http Opciones
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
