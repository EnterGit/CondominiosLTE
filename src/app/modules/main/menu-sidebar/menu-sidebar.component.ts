import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
    // this.user = this.appService.user;
        this.user = this.appService.obtenerProfile();
        //this.menu = MENU.filter((item) => item.roles.includes(this.user.ROLE));
        this.menu = MENU.filter(item => item.roles && item.roles.includes(this.user.ROLE));
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/'],
        roles: ['admin', 'user']
    },
    {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank'],
        roles: ['admin', 'user']
    },
    {
        name: 'Condominios',
        iconClasses: 'fas fa-home',
        path: ['/condominios'],
        roles: ['admin', 'user']
    },
    {
        name:'Portones',
        iconClasses: 'fas fa-door-open',
        path: ['/crudportones']
    },
    {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',
        roles: ['admin', 'user'],        
        children: [
            {
                name: 'Sub Menu',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1'],
                roles: ['admin', 'user']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2'],
                roles: ['admin', 'user']
            }
        ]
    }
];
