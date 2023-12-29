import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';


//import { CrudCondominiosComponent } from '../popup/crud-condominios/crud-condominios.component';
import { CrudZonasComponent } from '../popup/crud-zonas/crud-zonas.component';
import { UpdatePageService } from '@services/update-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//Servicios
import { CrudzonaService } from '../../services/crudzona.service';
import { PopupService } from '@services/popup.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export class ZonasComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  zonas: any[] = [];
 allzonas: any[] = [];


  constructor
  (
    private popupService: PopupService,
    private updatePageService: UpdatePageService,
    private dialog: MatDialog,
    private CrudzonaService: CrudzonaService,
  ) { 

   // this.updatePageService.updatePageObservable.subscribe(() => {
     // this.ListarVisitas();
     this.updatePageService.updatePageObservable.subscribe(() => {
      this.ListarZona("1");
     }
      )
  }

  ngOnInit(): void {
    console.log('ZonasComponent.ngOnInit was called');
    this.ListarZona("1");
  }


ListarZona(condominio_id_ : string){
  this.CrudzonaService.getlistZonaById("1").subscribe({
    next: (zonas) => {
      this.zonas = zonas;
      this.allzonas = zonas;
      this.onPageChange({ pageIndex: 0, pageSize: 10 } as PageEvent);
    },
    error: (error) => {
      console.log('Hubo un error al obtener las zonas', error);
    }
  });
}

//ZonaCoberturaID":1,"CondominioID":1,"LatLng_A":"-33.433222, -70.655444","LatLng_B":"-33.431222, -70.653444","LatLng_C":"-33.429222, -70.651444","LatLng_D":"-33.427222, -70.649444"

onPageChange(event: PageEvent) {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.zonas = this.allzonas.slice(startIndex, endIndex);
}

}
