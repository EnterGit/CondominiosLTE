import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { crudPortonesService } from '../../services/crudportones.services';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortonesComponent } from '../popup/portones/portones.component';
import { MatInputModule } from '@angular/material/input';
import{MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PopupService } from '@services/popup.service';

@Component({
  selector: 'app-crud-portones',
  templateUrl: './crud-portones.component.html',
  styleUrls: ['./crud-portones.component.scss']
})
export class CrudPortonesComponent implements OnInit {

  regionesModel: any[] = [];
  comunasModel: any[] = [];
  portones: any[] = []; // Asegúrate de que portones esté inicializado

  postulanteModel = {
    rut: ''
  };

  formPortones!: FormGroup;
  titulo = 'Gestión Portones';
  imagen: any;
  //private fb: FormBuilder;
  //mensajeError: string;
  loading = false;
  maxDate = new Date;
  condominioID: string = '1';
  Portones:  any[]=[]; // Asegúrate de que Portones esté inicializado


  constructor
  (
    private crudPortonesService: crudPortonesService,
    private dialog: MatDialog,
    private popupService: PopupService
    
    //declara variable condominioID.
  
    
    //private http: HttpClient,
    //private ruta: ActivatedRoute,
    //private router: Router,
    //private fb: FormBuilder,
    //private regionService: LisregionesService,
    //private rutService: RutService,
    //private encriptar: EncriptarService,
    //private postulanteService: PostulantesService,
    //private snackBar: MatSnackBar,
    //private datePipe: DatePipe


    ) { 

      this.titulo = "Formulario de Registro Postulante";
      this.imagen = "https://media.istockphoto.com/vectors/online-registration-form-vector-id1199278357";
     
    }



    
ngOnInit(): void {
  this.listarPortones('1');
  }    


  onSubmit() {
    console.log(this.formPortones.value);
  }


  //listar portones
listarPortones(CondominioID: string,) {
  console.log('listarPortones fue llamado con:' + CondominioID); // Agrega esto
  this.crudPortonesService.getlistPortones(CondominioID).subscribe({
    next: (portones) => {
      console.log('getlistPortones respondió con', portones); // Agrega esto
      this.portones = portones; // Modificado a 'portones' para coincidir con la plantilla
    },
    error: (error) => {
      console.log('Hubo un error al obtener los portones', error);
    }
  });
}

editarPorton(PortonID: string, CondominioID: string, Descripcion: string) {
  console.log('updatePorton fue llamado con', PortonID, CondominioID, Descripcion); // Agrega esto

  this.crudPortonesService.getUpdatePortones(PortonID, CondominioID, Descripcion).subscribe({
    next: (response) => {
      console.log('getUpdatePortones respondió con', response); // Agrega esto
      // Aquí puedes agregar código para manejar la respuesta, por ejemplo, puedes llamar a listarPortones para actualizar la lista
      this.listarPortones(CondominioID);
    },
    error: (error) => {
      console.log('Hubo un error al actualizar el porton', error);
    }
  });
}

addPorton(CondominioID: string, Descripcion: string) {
  console.log('addPorton fue llamado con', CondominioID, Descripcion); // Agrega esto
  this.crudPortonesService.getAddPortones(CondominioID, Descripcion).subscribe({
    next: (response) => {
      console.log('getAddPortones respondió con', response); // Agrega esto
      // Aquí puedes agregar código para manejar la respuesta, por ejemplo, puedes llamar a listarPortones para actualizar la lista
      this.listarPortones(CondominioID);
    },
    error: (error) => {
      console.log('Hubo un error al agregar el porton', error);
    }
  });
}

deletePorton(PortonID: string) {
  console.log('deletePorton fue llamado con', PortonID); // Agrega esto
  this.crudPortonesService.getDeletePortones(PortonID).subscribe({
    next: (response) => {
      console.log('getDeletePortones respondió con', response); // Agrega esto
      // Aquí puedes agregar código para manejar la respuesta, por ejemplo, puedes llamar a listarPortones para actualizar la lista
     // this.listarPortones();
    },
    error: (error) => {
      console.log('Hubo un error al eliminar el porton', error);
    }
  });
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

  this.popupService.openPopup(PortonesComponent, 'admin2', 'Formulario de Registro Portones 2', "");
  }

  editcustomer(code: any) {
    console.log('editcustomer fue llamado  web', code); // Agrega esto
    //this.Openpopup(code, 'Edit Customer',PortonesComponent);
  
    this.popupService.openPopup(PortonesComponent, 'admin', 'Editar Porton', code);

  }

 


}
