import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class crudPortonesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Agrega aquí más métodos según sea necesario

  //http://localhost:3000/portones/add


    getAddPortones(CondominioID: string, Descripcion: string): Observable<any> {
      const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
        return this.http.post('http://localhost:3000/portones/add', {
          CondominioID,
          Descripcion,
        });
      }
    
      //agrega update portones
      getUpdatePortones(PortonID: string, CondominioID: string, Descripcion: string): Observable<any> {
        const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
          return this.http.put('http://localhost:3000/portones/update', {
            PortonID,
            CondominioID,
            Descripcion,
          });
        }
    
        //agrega delete portones
      getDeletePortones(PortonID: string): Observable<any> {
        console.log('Desde services Angular delete Portones fue llamado con', PortonID); // Agrega esto

        const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
        return this.http.delete(`http://localhost:3000/portones/delete/${PortonID}`, { // Modificado a http.delete
          headers: { 'x-token': token },
        }).pipe(
          tap((response: any) => {
            console.log('getDeletePortones respondió con', response); // Agrega esto
          }),
          catchError((error: any) => {
            console.log('Hubo un error al eliminar los portones', error); // Agrega esto
            throw error;
          })
        );
      }

    

// listar portones
getlistPortones(CondominioID: string): Observable<any> {
  console.log('Desde services Angular getlistPortones fue llamado con', CondominioID); // Agrega esto

  const token = JSON.parse(localStorage.getItem('ACCESO') ?? '{}');
  return this.http.get(`http://localhost:3000/portones/list/${CondominioID}`, { // Modifica esto
    headers: { 'x-token': token },
  }).pipe(
    tap((response: any) => {
      console.log('getlistPortones respondió con', response); // Agrega esto
    }),
    catchError((error: any) => {
      console.log('Hubo un error al obtener los portones', error); // Agrega esto
      throw error;
    })
  );
}

  
      
      


  
  
  
  
  
  /*{
        "Rut": "15259193-4",
        "Nombres": "César",
        "Apellidos": "Collin",
        "CorreoElectronico": "cesar.trabajos@gmail.com",
        "Contrasena": "12345",
        "FechaRegistro": "2023-11-05T17:21:00.000Z",
        "FechaActualizacion": "2023-11-05T17:21:00.000Z",
        "Token": "def456",
        "Telefono": "5634567890",
        "Estado": "Activo"
    }
    */
  }