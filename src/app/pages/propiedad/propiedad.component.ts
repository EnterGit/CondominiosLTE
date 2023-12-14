import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CrudpropiedadService } from '@services/crudpropiedad.service';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss']
})
export class PropiedadComponent implements OnInit {

  allCondominios: any[] = [];
  propiedades: any[] = [];


  constructor(private listarpropiedadesService: CrudpropiedadService) { }

  ngOnInit(): void {
      this.ListarPropiedades();
  }

  ListarPropiedades() {
    this.listarpropiedadesService.getPropiedades().subscribe({
      next: (propiedades) => {
        console.log(propiedades);
        this.propiedades = propiedades;
        this.allCondominios = propiedades;
        this.onPageChange({ pageIndex: 0, pageSize: 10 } as PageEvent);
      },
      error: (error) => {
        console.log('Hubo un error al obtener los condominios', error);
      }
    });
  }


  eliminarCondominio(entada : any){}

  editarCondominio(entrada : any){
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.propiedades = this.allCondominios.slice(startIndex, endIndex);
  }

  Openpopup(){
    alert("hola");
  }
}



