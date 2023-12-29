import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudestacionamientoService } from '@services/crudestacionamiento.service';
import { CrudEstacionamientosComponent } from '../popup/crud-estacionamientos/crud-estacionamientos.component';
import { PopupService } from '@services/popup.service';
import { UpdatePageService } from '@services/update-page.service';

@Component({
  selector: 'app-estacionamientos',
  templateUrl: './estacionamientos.component.html',
  styleUrls: ['./estacionamientos.component.scss']
})
export class EstacionamientosComponent implements OnInit {

  formEstacionamiento!: FormGroup;
  titulo = 'Gestión Estacionamientos';
  imagen: any;
  loading = false;
  maxDate = new Date;
  condominioID: string = '1';
  estacionamientos: any[] = []; // Asegúrate de que estaionamientos esté inicializado

  constructor
  (
    private estacionamientoService: CrudestacionamientoService,
    private dialog: MatDialog,
    private popupService: PopupService,
    private updatePageService: UpdatePageService,
  ) { 
    this.updatePageService.updatePageObservable.subscribe(() => {
      this.listarEstacionamientos('1');
    })
  }

  ngOnInit(): void {
    this.listarEstacionamientos('1');
    }


  listarEstacionamientos(condominioID: any): void {
    this.estacionamientoService.list(condominioID).subscribe(
      (data: any) => {
        this.estacionamientos = data;
        },
        (error: any) => {
          console.log(error);
          }
        );
      }


  editarEstacionamiento(estacionamiento: any): void {
    console.log("editarCondominio" + estacionamiento);
    this.popupService.openPopup(CrudEstacionamientosComponent, 'admin', 'Editar Estacionamiento', estacionamiento);
  }

  eliminarEstacionamiento(estacionamiento: any): void {
    console.log("editarCondominio" + estacionamiento);
    this.popupService.openPopupDelete(CrudEstacionamientosComponent, 'admin', 'Eliminar Estacionamiento', estacionamiento, "Estacionamiento");
  }

  add(): void {
    this.popupService.openPopup(CrudEstacionamientosComponent, 'admin', 'Nuevo Estacionamiento', '');
  }
}
