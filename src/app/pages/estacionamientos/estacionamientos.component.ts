import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import{MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { CrudestacionamientoService } from '@services/crudestacionamiento.service';
import { CrudEstacionamientosComponent } from '../popup/crud-estacionamientos/crud-estacionamientos.component';



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
   

    ) { 

           
    }

  ngOnInit(): void {
    this.listarEstacionamientos('1');
      }   



      listarEstacionamientos(condominioID: any): void {
        this.estacionamientoService.list(condominioID).subscribe(
          (data: any) => {
            this.estacionamientos = data;
            console.log(data);
          },
          (error: any) => {
            console.log(error);
          }
        );
      }

 
      add(): void {}








}
