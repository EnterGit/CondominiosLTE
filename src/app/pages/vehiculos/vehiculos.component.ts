import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';


import { UpdatePageService } from '@services/update-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//Servicios
import { CrudvehiculosService } from '../../services/crudvehiculos.service';

import { PopupService } from '@services/popup.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  vehiculos: any[] = [];
 allvehiculos: any[] = [];


  constructor
  (
    private popupService: PopupService,
    private updatePageService: UpdatePageService,
    private dialog: MatDialog,
    private CrudvehiculosService: CrudvehiculosService,
  ) { 

   // this.updatePageService.updatePageObservable.subscribe(() => {
     // this.ListarVisitas();
     this.updatePageService.updatePageObservable.subscribe(() => {
      this.ListarVehiculos("1");
     }
      )
  }

  ngOnInit(): void {
    this.ListarVehiculos("1");
  }


ListarVehiculos(condominio_id_ : string){
  this.CrudvehiculosService.getlistvehiculoById(condominio_id_).subscribe({
    next: (vehiculos) => {
      this.vehiculos = vehiculos;
      this.allvehiculos = vehiculos;
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
  this.vehiculos = this.allvehiculos.slice(startIndex, endIndex);
}

}

