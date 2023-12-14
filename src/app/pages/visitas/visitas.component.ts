import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';


import { CrudCondominiosComponent } from '../popup/crud-condominios/crud-condominios.component';
import { UpdatePageService } from '@services/update-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//Servicios
import { CrudVisitasService } from '../../services/crudvisitas.service';
import { PopupService } from '@services/popup.service';


@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})




export class VisitasComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  visitas: any[] = [];
 visitas_id: any[] = [];
 allvisitas: any[] = [];


  constructor
  (
    private popupService: PopupService,
    private updatePageService: UpdatePageService,
    private dialog: MatDialog,
    private crudvisitasService: CrudVisitasService,
  ) { 

   // this.updatePageService.updatePageObservable.subscribe(() => {
     // this.ListarVisitas();
     this.updatePageService.updatePageObservable.subscribe(() => {
      this.ListarVisitas("1");
     }
      )
  }

  ngOnInit(): void {
    this.ListarVisitas("1");
  }


ListarVisitas(condominio_id_ : string){
  this.crudvisitasService.getlistvistaById(condominio_id_).subscribe({
    next: (visitas) => {
      this.visitas = visitas;
      this.allvisitas = visitas;
      this.onPageChange({ pageIndex: 0, pageSize: 10 } as PageEvent);
    },
    error: (error) => {
      console.log('Hubo un error al obtener las visitas', error);
    }
  });
}


onPageChange(event: PageEvent) {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.visitas = this.allvisitas.slice(startIndex, endIndex);
}

}
