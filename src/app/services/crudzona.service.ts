import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudzonaService {

   // Observable source
   private portonUpdatedSource = new Subject<void>();

   // Observable stream
   portonUpdated$ = this.portonUpdatedSource.asObservable();
 
   // Método para emitir el evento de actualización
   notifyPortonUpdate() {
     this.portonUpdatedSource.next();
   }
  private apiUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }



  getlist(): Observable<any> {
    console.log('listarPortones was called');
  
    const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
    return this.http.get('http://localhost:3000/zonacobertura/list', {
      headers: { 'x-token': token },
    }).pipe(
      tap((response: any) => {
        console.log('lista responded with', response);
      }),
      catchError((error: any) => {
        console.log('There was an error listing the portones', error);
        throw error;
      })
    );
  }

  getlistvistaById(IdCondominio: string): Observable<any> {
 
  
    const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
    return this.http.get(`http://localhost:3000/visitas/list/${IdCondominio}`, {   
  
      headers: { 'x-token': token },
    }).pipe(
      tap((response: any) => {
  
      }),
      catchError((error: any) => {
       
        throw error;
      })
    );
  }

}
