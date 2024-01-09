import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';


import { UpdatePageService } from '@services/update-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//Servicios

import { crudConfiguracionesService } from '../../services/crudconfiguraciones.services';

import { PopupService } from '@services/popup.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  Configuraciones: any[] = [];
 allconfiguraciones: any[] = [];


  constructor
  (
    private popupService: PopupService,
    private updatePageService: UpdatePageService,
    private dialog: MatDialog,
    private crudConfiguracionesService: crudConfiguracionesService,
  ) { 

   // this.updatePageService.updatePageObservable.subscribe(() => {
     // this.ListarVisitas();
     this.updatePageService.updatePageObservable.subscribe(() => {
      this.Configuraciones = [];
     }
      )
  }

  ngOnInit(): void {
    this.listarConfiguraciones();
  }




listarConfiguraciones(){

  console.log('listarConfiguraciones web');
  this.crudConfiguracionesService.getlistConfiguracion().subscribe({
    next: (configuraciones) => {
      console.log(configuraciones);
      this.Configuraciones = configuraciones;
      this.allconfiguraciones = configuraciones;
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
  this.Configuraciones = this.allconfiguraciones.slice(startIndex, endIndex);
}

}


