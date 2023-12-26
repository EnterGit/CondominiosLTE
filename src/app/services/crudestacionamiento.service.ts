import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudestacionamientoService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


add(condominioID: number, numeroEstacionamiento: number, disponible: boolean): Observable<any> {
  const body = { CondominioID: condominioID, NumeroEstacionamiento: numeroEstacionamiento, Disponible: disponible };
  return this.http.post(`${this.apiUrl}/estacionamientos`, body).pipe(
    catchError(error => {
      console.error('Error in add: ', error);
      return throwError(error);
    })
  );
}


update(estacionamientoID: number, condominioID: number, numeroEstacionamiento: number, disponible: boolean): Observable<any> {
  const body = { EstacionamientoID: estacionamientoID, CondominioID: condominioID, NumeroEstacionamiento: numeroEstacionamiento, Disponible: disponible };
  return this.http.put(`${this.apiUrl}/estacionamientos`, body).pipe(
    catchError(error => {
      console.error('Error in update: ', error);
      return throwError(error);
    })
  );
}


  delete(estacionamientoID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/estacionamientos/${estacionamientoID}`).pipe(
      catchError(error => {
        console.error('Error in deleteEstacionamiento: ', error);
        return throwError(error);
      })
    );
  }


list(condominioID: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/estacionamientos/list`).pipe(
    catchError(error => {
      console.error('Error in list: ', error);
      return throwError(error);
    })
  );
}




}
