import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListacombosService {

    

    private apiUrl = 'http://localhost:3000/combos'; // Reemplaza con la URL de tu API

    constructor(private http: HttpClient) { }

    getRegiones(): Observable<any> {
        return this.http.get(`${this.apiUrl}/regiones`);
    }


    getComunas(idRegion: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/comunas/${idRegion}`);
    }
      
}