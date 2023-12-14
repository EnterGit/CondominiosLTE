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

}
