import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePageService } from './update-page.service';
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private appService: AppService, 
    private dialog: MatDialog,
    private updatePageService: UpdatePageService) { }

  openPopup(component: any, role: string, titulo: string, valor:any) {
    const user = this.appService.obtenerProfile();
    if (user && user.ROLE === role) {
      // Abre el popup
      const dialogRef = this.dialog.open(component, {
        width: '60%',
        height: '400px',
        data: { 
          title : titulo,
          code : valor
        } 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.updatePageService.updatePage();
        
      });
    } else {
      // No abre el popup y posiblemente muestra un mensaje de error
      alert("NO TIENE ACCESO A ESTA FUNCIONALIDAD");
    }
  }

  openPopupDelete(component: any, role: string, titulo: string, valor:any) {
    const user = this.appService.obtenerProfile();
    if (user && user.ROLE === role) {
      // Abre el popup
      const dialogRef = this.dialog.open(component, {
        width: '40%',
        height: '150px',
        data: { 
          title : titulo,
          message: '¿Estás seguro de que quieres eliminar este condominio?',          
          code : valor
        } 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.updatePageService.updatePage();
        
      });
    } else {
      // No abre el popup y posiblemente muestra un mensaje de error
      alert("NO TIENE ACCESO A ESTA FUNCIONALIDAD");
    }
  }




  
}