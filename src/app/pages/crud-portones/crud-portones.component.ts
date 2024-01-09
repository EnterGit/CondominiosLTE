import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//servicios
import { crudPortonesService } from '../../services/crudportones.services';
import { PortonesComponent } from '../popup/portones/portones.component';
import { PopupService } from '@services/popup.service';
import { UpdatePageService } from '@services/update-page.service';

import {ToastrService} from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-crud-portones',
  templateUrl: './crud-portones.component.html',
  styleUrls: ['./crud-portones.component.scss']
})
export class CrudPortonesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  regionesModel: any[] = [];
  comunasModel: any[] = [];
  portones: any[] = []; // Asegúrate de que portones esté inicializado

  formPortones!: FormGroup;
  titulo = 'Gestión Portones';
  imagen: any;
  loading = false;
  maxDate = new Date;
  condominioID: string = '1';
  //Portones:  any[]=[]; 
  allPortones: any[] = [];



  constructor ( 
      private crudPortonesService: crudPortonesService,
      private dialog: MatDialog,
      private popupService: PopupService,
      private toastr: ToastrService,
      private updatePageService: UpdatePageService,      
    )
   { 
    this.updatePageService.updatePageObservable.subscribe(() => {
      this.listarPortones();
   })
  }


//Carga Grilla   
ngOnInit(): void {  this.listarPortones();}    


  onSubmit() {
    console.log(this.formPortones.value);
  }


  //listar portones
listarPortones() { 
  this.crudPortonesService.getlist().subscribe({
    next: (portones) => {
          this.portones = portones; 
          this.allPortones = portones;
          this.onPageChange({ pageIndex: 0, pageSize: 10 } as PageEvent);

    },
    error: (error) => {
      console.log('Hubo un error al obtener los portones', error);
    }
  });
}

//Agregar Nuevo Porton
add(){
      this.popupService.openPopup(PortonesComponent, 'admin', 'Nuevo Porton', "");
    }


editarPorton(PortonID: string, CondominioID: string, Descripcion: string) {
  console.log('updatePorton fue llamado con', PortonID, CondominioID, Descripcion); // Agrega esto

  this.crudPortonesService.getUpdatePortones(PortonID, CondominioID, Descripcion).subscribe({
    next: (response) => {
      console.log('getUpdatePortones respondió con', response); // Agrega esto
      // Aquí puedes agregar código para manejar la respuesta, por ejemplo, puedes llamar a listarPortones para actualizar la lista
      this.listarPortones();
    },
    error: (error) => {
      console.log('Hubo un error al actualizar el porton', error);
    }
  });
}



deletePorton(PortonID: string) {
  this.popupService.openPopupDelete(PortonesComponent, 'admin', 'Eliminar Porton', PortonID,"Porton");
}

Openpopup() {
  console.log('Openpopup fue llamado'); // Agrega esto
  this.popupService.openPopup(PortonesComponent, 'admin', 'Formulario de Registro Portones 2', "");
  }

  editcustomer(code: any) {
    console.log('editcustomer fue llamado  web', code); // Agrega esto
    //this.Openpopup(code, 'Edit Customer',PortonesComponent);
    this.popupService.openPopup(PortonesComponent, 'admin', 'Editar Porton', code);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.portones = this.allPortones.slice(startIndex, endIndex);
  }
}