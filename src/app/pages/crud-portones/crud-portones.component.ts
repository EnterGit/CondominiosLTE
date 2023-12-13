import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { crudPortonesService } from '../../services/crudportones.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortonesComponent } from '../popup/portones/portones.component';
import { MatInputModule } from '@angular/material/input';
import{MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


import { UpdatePageService } from '@services/update-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupService } from '@services/popup.service';



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
      this.popupService.openPopup(PortonesComponent, 'admin', 'Crear Nuevo Porton', "");
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
 /* const confirmDelete = window.confirm('¿Desea Eliminar Porton?');
  if (confirmDelete) {
    this.crudPortonesService.getDeletePortones(PortonID).subscribe(
      response => {
        console.log(response);
          this.toastr.success('porton  Eliminado');
        this.listarPortones(); // refresh the list after successful delete
      },
      error => {
        console.error(error);

        this.toastr.error('porton no  Eliminado');
      }
    );
  }*/

  this.popupService.openPopupDelete(PortonesComponent, 'admin', 'Eliminar Porton', PortonID,"Porton");
 
}

Openpopup() {

  console.log('Openpopup fue llamado'); // Agrega esto
  // var _popup= this.dialog.open(PortonesComponent, {
  //   width: '60%',
  //   enterAnimationDuration: '1000ms',
  //   exitAnimationDuration: '1000ms',
  //   height: '400px',
  //   data: { 
  //   title : "Formulario de Registro Portones 222"
  //   } 
  //    });
  //   _popup.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   }
  //   );

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