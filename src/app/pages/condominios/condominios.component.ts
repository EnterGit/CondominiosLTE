import { Component, OnInit } from '@angular/core';
import { ListarcondominiosService } from '../../services/listarcondominios.service';

@Component({
  selector: 'app-condominios',
  templateUrl: './condominios.component.html',
  styleUrls: ['./condominios.component.scss']
})
export class CondominiosComponent implements OnInit{
  condominios: any[] = [];

  constructor(private listarcondominiosService: ListarcondominiosService) { }

  ngOnInit() {
    this.Listarcondominios();
   }
 
   Listarcondominios() {
     this.listarcondominiosService.getCondominios().subscribe({
       next: (condominios) => {
         console.log(condominios);
         this.condominios = condominios;
       },
       error: (error) => {
         console.log('Hubo un error al obtener los condominios', error);
       }
     });
   }
   editarCondominio(condominio : string){};
   eliminarCondominio(condominio : string){};


}
