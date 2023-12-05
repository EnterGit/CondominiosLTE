import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class crudConfiguracionesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAddConfiguracion(CondominioID: string, NombreConfiguracion: string, ValorConfiguracion: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
      return this.http.post('http://localhost:3000/configuraciones/add', {
        CondominioID,
        NombreConfiguracion,
        ValorConfiguracion,

      });
    }

    	
    getUpdateConfiguracion(ConfiguracionID: string, CondominioID: string, NombreConfiguracion: string, ValorConfiguracion: string): Observable<any> {
      const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
        return this.http.put('http://localhost:3000/configuraciones/update', {
          ConfiguracionID,
          CondominioID,
          NombreConfiguracion,
          ValorConfiguracion,
        });
      }
  
        //agrega delete portones
        getDeleteConfiguracion(ConfiguracionID: string): Observable<any> {
            console.log('Desde services Angular delete Configuracion fue llamado con', ConfiguracionID); // Agrega esto
    
            const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
            return this.http.delete(`http://localhost:3000/configuraciones/delete/${ConfiguracionID}`, { // Modificado a http.delete
                headers: { 'x-token': token },
            }).pipe(
                tap((response: any) => {
                console.log('getDeleteConfiguracion respondió con', response); // Agrega esto
                }),
                catchError((error: any) => {
                console.log('Hubo un error al eliminar los Configuracion', error); // Agrega esto
                throw error;
                })
            );
            }

    // listar portones
    getlistConfiguracion(CondominioID: string): Observable<any> {
      console.log('Desde services Angular getlistConfiguracion fue llamado con', CondominioID); // Agrega esto
  
      const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
      return this.http.get(`http://localhost:3000/configuraciones/list/${CondominioID}`, {
        headers: { 'x-token': token },
      }).pipe(
        tap((response: any) => {
          console.log('getlistConfiguracion respondió con', response); // Agrega esto
        }),
        catchError((error: any) => {
          console.log('Hubo un error al listar los Configuracion', error); // Agrega esto
          throw error;
        })
      );
    }


    
   



}

