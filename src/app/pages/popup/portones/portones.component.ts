import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {ToastrService} from 'ngx-toastr';
//servicio

import { crudPortonesService } from '../../../services/crudportones.services';


@Component({
  selector: 'app-portones',
  templateUrl: './portones.component.html',
  styleUrls: ['./portones.component.scss']
})
export class PortonesComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'

  private porton_ID: string;
  private condominio_ID: string;

  
showUpdateButton = false; // add this line to your component properties

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
     private ref: MatDialogRef<PortonesComponent>, 
     private buildr: FormBuilder, 
     private crudPortonesService: crudPortonesService,
     private toastr: ToastrService,
     ) {

  }
  ngOnInit(): void {
    //this.inputdata = this.data;
    //console.log(this.data);


    this.inputdata = this.data;
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }



setpopupdata(code: any) {
  console.log("desde el popup:" + code);
  



  this.crudPortonesService.getByPortonId(code).subscribe(response => {
    let item = response[0]; // access the first object in the array
    this.editdata = item;
    console.log("este es el json:" + JSON.stringify(this.editdata)); // convert object to JSON string

    let PortonID = item.PortonID;
    console.log("portonID:" + PortonID);

   this.condominio_ID = item.CondominioID;

    let Nombre = item.Nombre;
    console.log("Nombre:" + Nombre);
    let descripcion = item.Descripcion; // note the capital D in Descripcion
    console.log("descripcion:" + descripcion);

    this.myform.patchValue({
      PortonID: PortonID,
      
      Nombre: Nombre,
      descripcion: descripcion
    });

    this.myform.get('PortonID').disable(); // disable the PortonID input field
    this.myform.get('Nombre').disable(); // disable the Nombre input field
    this.showUpdateButton = true;
  });
}


updatePorton() {
  //let PortonID = this.myform.get('PortonID').value; // get the PortonID from the form
  let PortonID = this.myform.get('PortonID').value;
  console.log("PortonID:" + PortonID);
  let Descripcion = this.myform.get('descripcion').value;

  this.crudPortonesService.getUpdatePortones(PortonID,this.condominio_ID, Descripcion).subscribe(response => {
    console.log(response);
    
     this.toastr.success('porton  Actualizado');
     //this.crudPortonesService.getUpdatePortones(condominio_ID); // call listarPortones after successful update
  }, error => {
    console.log(error);
      this.toastr.error('porton no  Actualizado');
  }
  );
}
 





  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    PortonID: this.buildr.control(''),
    Nombre: this.buildr.control(''),
    descripcion: this.buildr.control('')

  
    

  });


 

  SavePorton() {
    this.closepopup();

    
  }

}