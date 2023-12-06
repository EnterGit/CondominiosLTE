import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private appService: AppService, private dialog: MatDialog) { }

  openPopup(component: any, role: string, titulo: string) {
    const user = this.appService.obtenerProfile();
    if (user && user.ROLE === role) {
      // Abre el popup
      const dialogRef = this.dialog.open(component, {
        width: '60%',
        height: '400px',
        data: { 
          title : titulo
        } 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      // No abre el popup y posiblemente muestra un mensaje de error
      alert("NO TIENE ACCESO A ESTA FUNCIONALIDAD");
    }
  }
  
}