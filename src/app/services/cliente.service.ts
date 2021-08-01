import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  ver: boolean = false;
  editar: boolean = false;
  crear: boolean = false;
  
  public urlApi: string = "http://localhost:3000/clientes/";

  constructor(private http: HttpClient) { }

  // Obtiene el listado completo de clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlApi)
    .pipe(retry(1), catchError(this.handleError))
  }

  // Obtiene cliente vía id
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlApi + id)
    .pipe(retry(1), catchError(this.handleError))
  }  

  // Crea un nuevo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlApi, 
      JSON.stringify(cliente), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }  

  // Modificar un cliente vía id 
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.urlApi + id, 
      JSON.stringify(cliente), this.httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  // Elimina un cliente vía id
  deleteCliente(id: number){
    return this.http.delete<Cliente>(this.urlApi + id, this.httpOptions)
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
