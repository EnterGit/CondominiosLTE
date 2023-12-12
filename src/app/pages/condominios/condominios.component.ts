import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { ListarcondominiosService } from '../../services/listarcondominios.service';
import { PopupService } from '@services/popup.service';
import { CrudCondominiosComponent } from '../popup/crud-condominios/crud-condominios.component';
import { UpdatePageService } from '@services/update-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-condominios',
  templateUrl: './condominios.component.html',
  styleUrls: ['./condominios.component.scss']
})
export class CondominiosComponent implements OnInit{
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  condominios: any[] = [];
  condominios_id: any[] = [];
  allCondominios: any[] = [];

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private listarcondominiosService: ListarcondominiosService,
    private popupService: PopupService,
    private updatePageService: UpdatePageService,
    private dialog: MatDialog
    )
    { 
      this.updatePageService.updatePageObservable.subscribe(() => {
        this.Listarcondominios();
      }
      )
    }


  ngOnInit() {
    this.Listarcondominios();
   }
 
   Listarcondominios() {
     this.listarcondominiosService.getCondominios().subscribe({
       next: (condominios) => {
         //console.log(condominios);
         this.condominios = condominios;
         this.allCondominios = condominios;
         this.onPageChange({ pageIndex: 0, pageSize: 10 } as PageEvent);
       },
       error: (error) => {
         console.log('Hubo un error al obtener los condominios', error);
       }
     });
   }


   editarCondominio(condominio : string){
    console.log("editarCondominio" + condominio);
    this.popupService.openPopup(CrudCondominiosComponent, 'admin', 'Editar Condominio', condominio);
   };


   eliminarCondominio(condominio : string){
    console.log("eliminarCondominio" + condominio);
         this.popupService.openPopupDelete(CrudCondominiosComponent, 'admin', 'Eliminar Condominio', condominio);
   };

   Openpopup(){
    this.popupService.openPopup(CrudCondominiosComponent, 'admin', 'Nuevo Condominio', '');
   }


   onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.condominios = this.allCondominios.slice(startIndex, endIndex);
  }

}
