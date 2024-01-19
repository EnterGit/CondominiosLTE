import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';
@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
    ) { }

    ngOnInit() {
        this.user = this.appService.obtenerProfile();
        this.menu = MENU.filter(item => item.roles && item.roles.includes(this.user.ROLE));
    }

    isAdmin() {
        return this.user.perfil === 'admin';
      }
}


export const MENU = [
    {
        name: 'CLAUDIO',
        numero: '1',
        link: ['/condominios'],
        roles: ['admin', 'user']
    },
    {
        name: 'CESAR',
        numero: '2',
        link: ['/estacionamientos'],
        roles: ['admin', 'user']
    },
]