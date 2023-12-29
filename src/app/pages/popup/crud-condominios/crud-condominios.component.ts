import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListarcondominiosService } from '@services/listarcondominios.service';
import { ListacombosService } from '@services/listacombos.services';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-crud-condominios',
  templateUrl: './crud-condominios.component.html',
  styleUrls: ['./crud-condominios.component.scss']
})
export class CrudCondominiosComponent implements OnInit {
  inputdata: any;
  editdata: any;
  buttonValue: string = '';
  regiones: any[] = []; // Array para almacenar las regiones
  comunas: any[] = []; // Array para almacenar las regiones
  selectedRegionId: number;
  selectComunaId: number;
  selectedId: any;

  myform = this.buildr.group({
    IdCondominio: this.buildr.control(''),
    NombreCondominio: this.buildr.control('', Validators.required),
    DireccionCondominio: this.buildr.control('', Validators.required),
    NumeroCondominio: this.buildr.control('', Validators.required),
    ComunaCondominio: this.buildr.control('', Validators.required),
    RegionCondominio: this.buildr.control('', Validators.required)

  });

  showUpdateButton = false; // add this line to your component properties
  showFormDelete = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CrudCondominiosComponent>,
    private buildr: FormBuilder, 
    private listarcondominiosService: ListarcondominiosService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CrudCondominiosComponent>,
    private regionService: ListacombosService

      ) {  }
  
  ngOnInit(): void {
    
    this.inputdata = this.data;
    // this.buttonValue = this.inputdata.CondominioID > 0 ? 'Actualizar' : 'Guardar';
    console.log("inputdata entrada: " , this.inputdata);

    if (this.inputdata.title == "Nuevo Condominio") {
      this.showUpdateButton = false;
      this.listRegiones();
    } else 
    if (this.inputdata.title == "Eliminar Condominio")
    {
      this.showFormDelete = true;    
    } else
      if(this.inputdata.code>0){     
      this.cargaDatos(this.inputdata.code)
      }  
    }
  


  cargaDatos(code: any){
    this.listarcondominiosService.getCondominioId(code).subscribe(response => {
      let item = response[0]; // access the first object in the array
      this.editdata = item;
      this.buttonValue = item.CondominioID;

      this.selectedId = parseInt(item.Region); 
      this.selectComunaId = parseInt(item.Comuna); 


      this.listRegiones();
      this.onRegionChange(this.selectedId);

      this.myform.patchValue({
        IdCondominio: item.CondominioID,
        NombreCondominio: item.Nombre,
        DireccionCondominio: item.Direccion,
        NumeroCondominio: item.NumeroDireccion,
        ComunaCondominio: item.Comuna,
        RegionCondominio: item.Region
      });
      // this.myform.get('PortonID').disable(); // disable the PortonID input field
      // this.myform.get('Nombre').disable(); // disable the Nombre input field
      this.showUpdateButton = true;
    });
  }

  
  updateCondomino(id : any){
    const formData = this.myform.value
    console.log("updateCondomino" , formData)
    this.listarcondominiosService.updateCondominio(formData).subscribe(response => {
      this.toastr.success('Condominio Actualizado');
      this.dialogRef.close();
    }, error => {
      console.log(error);
        this.toastr.error('Condominio no Actualizado');
    });
  }


  SaveCondominio(){
    const formData = this.myform.value
    this.listarcondominiosService.addCondominio(formData).subscribe(response => {
      this.toastr.success('Condominio Ingresado');
      this.dialogRef.close();
    }, error => {
      console.log(error);
        this.toastr.error('Condominio no Ingresado');
    });

  }

  onConfirm(code: any){
    console.log("onConfirm ", code.Nombre);
    this.dialogRef.close();
    // this.listarcondominiosService.deleteCondominio(code.CondominioID).subscribe(response => {
    //   this.toastr.success('Condominio Eliminado');
    //   this.dialogRef.close();
    // }, error => {
    //   console.log(error);
    //     this.toastr.error('Condominio no Eliminado');
    // });
  }

  closepopup(){
    console.log("closepopup condominio");
    this.ref.close('Closed using function');
  }

  listRegiones(){
    this.regionService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;    
  });
}


  onRegionChange(value) {
    this.selectedRegionId = value;
    this.regionService.getComunas(this.selectedRegionId).subscribe(comunas => {
      this.comunas = comunas;
    });
  }

}
