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


addEstacionamiento(condominioID: number, numeroEstacionamiento: number, disponible: boolean): Observable<any> {
  const body = { CondominioID: condominioID, NumeroEstacionamiento: numeroEstacionamiento, Disponible: disponible };
  return this.http.post(`${this.apiUrl}/estacionamientos`, body).pipe(
    catchError(error => {
      console.error('Error in add: ', error);
      return throwError(error);
    })
  );
}


updateEstacionamiento(estacionamiento: any): Observable<any> {
  console.log('Desde services Angular updateCondominio fue llamado con', estacionamiento);
  const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
  const headers = { 'Authorization': 'Bearer ' + token };
  return this.http.post('http://localhost:3000/estacionamientos/update/', estacionamiento, { headers }); 
}


deleteEstacionamiento(estacionamientoID: any): Observable<any> {

  console.log('Desde services Angular deleteCondominio fue llamado con', estacionamientoID);
    const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.http.post('http://localhost:3000/estacionamientos/delete/', estacionamientoID, { headers });
}


list(condominioID: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/estacionamientos/list`).pipe(
    catchError(error => {
      console.error('Error in list: ', error);
      return throwError(error);
    })
  );
}

getEstacionamientosId(estacionamientoId: number): Observable<any> {
  const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
  const headers = { 'Authorization': 'Bearer ' + token };
  return this.http.get('http://localhost:3000/estacionamientos/' + estacionamientoId, { headers });
}


}
