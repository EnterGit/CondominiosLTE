import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudusuarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Agrega aquí más métodos según sea necesario

  getLogin(correo: string, password: string): Observable<any> {
    // console.log('ingreso al servicio');
    // console.log('correo:' + correo);
    // console.log('pass:' + password);
    return this.http.post('http://localhost:3000/users/login', {
      correo,
      password,
    });
  }
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