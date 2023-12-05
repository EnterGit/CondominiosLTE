import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudestacionamientoService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  

}
