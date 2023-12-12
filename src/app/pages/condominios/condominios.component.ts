import { PortonesComponent } from './../popup/portones/portones.component';
import { Component, OnInit } from '@angular/core';
import { ListarcondominiosService } from '../../services/listarcondominios.service';
import { PopupService } from '@services/popup.service';

@Component({
  selector: 'app-condominios',
  templateUrl: './condominios.component.html',
  styleUrls: ['./condominios.component.scss']
})
export class CondominiosComponent implements OnInit{
  condominios: any[] = [];
  condominios_id: any[] = [];


  constructor(private listarcondominiosService: ListarcondominiosService,
    private popupService: PopupService) { }

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


   editarCondominio(condominio : string){
    
    this.popupService.openPopup(PortonesComponent, 'admin', 'Editar Condominio','');
    // console.log("Editar condominio");
    // this.listarcondominiosService.getCondominioId(condominio).subscribe({
    //   next: (condominio) => {
    //     this.condominios_id = condominio;
    //     console.log(this.condominios_id);
    //   },
    //   error: (error) => {
    //     console.log('Hubo un error al obtener el condominio', error);
    //   }
    // });
   };


   eliminarCondominio(condominio : string){};



   Openpopup(){
    alert("Abriendo popup");
   }

}
