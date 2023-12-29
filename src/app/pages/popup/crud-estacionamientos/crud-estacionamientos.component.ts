import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudestacionamientoService } from '@services/crudestacionamiento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-estacionamientos',
  templateUrl: './crud-estacionamientos.component.html',
  styleUrls: ['./crud-estacionamientos.component.scss']
})

export class CrudEstacionamientosComponent implements OnInit {

  showFormDelete = false;
  showUpdateButton = false;
  buttonValue: string = '';
  inputdata: any;


  myform = this.buildr.group({
    // CondominioID: this.buildr.control('', Validators.required),
    EstacionamientoID: this.buildr.control(''),
    Nombre: this.buildr.control('', Validators.required),
    Disponible: this.buildr.control('', Validators.required),
    NumeroEstacionamiento: this.buildr.control('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CrudEstacionamientosComponent>,
    public dialogRef: MatDialogRef<CrudEstacionamientosComponent>,
    private buildr: FormBuilder,
    private crudEstacionamientoService: CrudestacionamientoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;

    console.log("Data recibida: ", this.inputdata.code);
    if (this.inputdata.title == "Nuevo Estacionamiento") {
      this.showUpdateButton = false;
    } else 
    if (this.inputdata.title == "Eliminar Estacionamiento")
    {
      this.showFormDelete = true;    
    } else
      if(this.inputdata.code>0){     
      this.cargaEstacionamiento(this.inputdata.code)
      }
  }

  cargaEstacionamiento(code: any){
    this.crudEstacionamientoService.getEstacionamientosId(code).subscribe(response => {
      let item = response[0];
      console.log("Respuesta de carga de estacionamiento: ", response);
      this.buttonValue = item.CondominioID;

      this.myform.patchValue({
        // CondominioID: item.CondominioID,
        Nombre: item.Nombre,
        NumeroEstacionamiento: item.NumeroEstacionamiento,
        Disponible: item.Disponible,
        EstacionamientoID: item.EstacionamientoID,
      });
    });
    this.showUpdateButton = true;
  }


  SaveEstacionamiento(){
    console.log("Guardar Condominio");
  }

  updateEstacionamiento(idEstaciona : string){
    const formdata = this.myform.value;
    console.log("Formulario: ", formdata);
    this.crudEstacionamientoService.updateEstacionamiento(formdata).subscribe(response => {
      this.toastr.success('Estacionamiento Actualizado');
      this.dialogRef.close();
      console.log("Respuesta de actualización: ", response);
    }, error => {
      console.log(error);
        this.toastr.error('Estacionamiento no Actualizado');
    })
  }

  closepopup(){ 
    this.ref.close('Closed using function');
  }

  onConfirm(code: any){
    console.log("onConfirm ", code.EstacionamientoID);
    this.dialogRef.close();

    this.crudEstacionamientoService.deleteEstacionamiento(code).subscribe(response => {
      this.toastr.success('Estacionamiento Eliminado');
      this.dialogRef.close();
      console.log("Respuesta de actualización: ", response);
      }, error => {
        console.log(error);
        this.toastr.error('Estacionamiento no Eliminado');
      });
  } 

}
