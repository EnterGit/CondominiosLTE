import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudpropiedadService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Agrega aquí más métodos según sea necesario

  getPropiedades(): Observable<any>{
    // Aquí va la lógica para obtener tu token
    const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
    const headers = { 'Authorization': 'Bearer ' + token };
    // console.log('valor del token Sevicio:' + token);
    return this.http.get('http://localhost:3000/propiedad', { headers });

  }
}
