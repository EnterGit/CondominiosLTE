import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {ToastrService} from 'ngx-toastr';
//servicio

import { crudPortonesService } from '../../../services/crudportones.services';
import { ListarcondominiosService } from '@services/listarcondominios.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-portones',
  templateUrl: './portones.component.html',
  styleUrls: ['./portones.component.scss']
})
export class PortonesComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  isNewPorton = false;
  private porton_ID: string;
  private condominio_ID: string;
  selectedCondominios: any;
  selectedId:any;
  condominios: any[] = [];
  hidePortonID = false;
  showFormDelete = false;
  showUpdateButton = false; 

  myform = this.buildr.group({
    PortonID: this.buildr.control(''),
    Nombre: this.buildr.control(''),
    Descripcion: this.buildr.control('', Validators.required),
    CondominioID: this.buildr.control('', Validators.required),
    

  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
     private ref: MatDialogRef<PortonesComponent>, 
     private buildr: FormBuilder, 
     private crudPortonesService: crudPortonesService,
     private toastr: ToastrService,
      private listarcondominiosService: ListarcondominiosService,
      public dialogRef: MatDialogRef<crudPortonesService>,
     ) {

  }


  ngOnInit(): void {
  
    this.inputdata = this.data;
    
    if(this.inputdata.title == "Nuevo Porton"){  
      this.hidePortonID = true;
      this.Listarcondominios();      
    }
    else
    {     
      if (this.inputdata.title == "Eliminar Porton")
      {
        this.showFormDelete = true;        
      }
      else
      {
        if(this.inputdata.code > 0)
        {
          this.loadUpdate(this.inputdata.code)
        }
      }

     
    }

  }

  


//lista mat-select Condominios
  Listarcondominios() {
    this.listarcondominiosService.getCondominios().subscribe({
      next: (condominios) => {
        this.condominios = condominios;
      },
      error: (error) => {
        console.log('Hubo un error al obtener los condominios', error);
      }
    });
  }

  selectCondominio(condominioId: any) {
    this.selectedCondominios = this.condominios.find(condominio => condominio.Id === condominioId);
    console.log(this.selectedCondominios);
  }



//Agrega Nuevo Porton
addPorton(portonData: any): void {
  const formData = this.myform.value

  console.log("desde el popup:" + portonData);
//portonData.Descripcion
  this.crudPortonesService.postAddPortones(this.selectedId, portonData.Descripcion).subscribe(
    response => {
      this.toastr.success('porton  Ingresado');
      this.dialogRef.close();
      this.crudPortonesService.notifyPortonUpdate();
    },
    error => {
      this.toastr.error('porton no Ingresado');
    }
  );
}
 




//Metodo para cargar los datos del porton a editar, recupera por el id del porton
loadUpdate(code: any) {
  
    this.crudPortonesService.getByPortonId(code).subscribe(response => {
    let item = response[0]; // access the first object in the array
    this.editdata = item;
  
    let PortonID = item.PortonID;
    this.condominio_ID = item.CondominioID;
    this.selectedId = this.condominio_ID;

console.log("PortonID:" + PortonID);

    this.hidePortonID = false;

//    this.portonForm.get('PortonID').value(PortonID);
    this.myform.get('PortonID').disable(); 

    //let descripcion: string;
   //descripcion = item.Descripcion as string;

    //let Descripcion = this.portonForm.get('descripcion').value.toString(); // O .toString() u otro método adecuado si el valor no es una cadena
    //this.myform.get('Descripcion').setValue(Descripcion);

    this.Listarcondominios();

    this.myform.patchValue({
      PortonID: item.PortonID,
      Descripcion: item.Descripcion,
    });

  
    this.showUpdateButton = true;
  });
}


updatePorton() {
  //let PortonID = this.myform.get('PortonID').value; // get the PortonID from the form
  let PortonID = this.myform.get('PortonID').value;
  let Descripcion = this.myform.get('descripcion').value;

  this.crudPortonesService.getUpdatePortones(PortonID,this.condominio_ID, Descripcion).subscribe(response => {
    console.log(response);
    
     this.toastr.success('porton  Actualizado');
       // Llama a listarPortones para actualizar la lista después de la actualización exitosa
       this.crudPortonesService.notifyPortonUpdate();
       this.dialogRef.close();

     this.listarPortones('1');
  }, error => {
    console.log(error);
      this.toastr.error('porton no  Actualizado');
  }
  );
}


listarPortones(CondominioID: string,) {
  console.log('listarPortones fue llamado con:' + CondominioID); // Agrega esto
  this.crudPortonesService.getlistPortones(CondominioID).subscribe({
    next: (portones) => {
      console.log('getlistPortones respondió con', portones); // Agrega esto
      //this.portones = portones; // Modificado a 'portones' para coincidir con la plantilla

       // Después de actualizar exitosamente el portón, notificar al servicio
    this.crudPortonesService.notifyPortonUpdate();
    },
    error: (error) => {
      console.log('Hubo un error al obtener los portones', error);
    }
  });
}
 
onConfirm(code: any){
  console.log("onConfirm ", code.Nombre);
  this.dialogRef.close();
 
}



closepopup(){
  console.log("closepopup portones");
  this.ref.close('Closed using function');
}



 

  SavePorton() {
    this.closepopup();

    
  }

}