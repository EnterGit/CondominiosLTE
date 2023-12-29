import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';

import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { CondominiosComponent } from '@pages/condominios/condominios.component';
import { AuthmenuGuard } from '@guards/authmenu.guard';

//paginas
import { CrudPortonesComponent } from './pages/crud-portones/crud-portones.component';
import { ConfiguracionesComponent } from '@pages/configuraciones/configuraciones.component';
import { EstacionamientosComponent } from '@pages/estacionamientos/estacionamientos.component';
import { VisitasComponent } from '@pages/visitas/visitas.component';
import { PropiedadComponent } from '@pages/propiedad/propiedad.component';
import { VehiculosComponent } from '@pages/vehiculos/vehiculos.component';
import { ZonasComponent } from '@pages/zonas/zonas.component';

//popup
import { PortonesComponent } from './pages/popup/portones/portones.component';
import { CrudZonasComponent } from './pages/popup/crud-zonas/crud-zonas.component';
import { CrudPropiedadComponent } from './pages/popup/crud-propiedad/crud-propiedad.component';
import { CrudEstacionamientosComponent } from './pages/popup/crud-estacionamientos/crud-estacionamientos.component';
import { CrudVisitasComponent } from './pages/popup/crud-visitas/crud-visitas.component';
import { CrudVehiculoComponent } from './pages/popup/crud-vehiculo/crud-vehiculo.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          
            {
                path: 'condominios',
                component: CondominiosComponent,
                 canActivate: [AuthmenuGuard],
                 data: { role: 'admin' }
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'crudportones',
                component: CrudPortonesComponent,
                canActivate: [AuthmenuGuard],
                data: { role: 'admin' }
            },
            {
                path: 'portones',
                component: PortonesComponent
            },
            {
                path: 'configuraciones',
                component: ConfiguracionesComponent
            },
            {
                path: 'estacionamientos',
                component: EstacionamientosComponent
            },
            {
                path: 'crud-estacionamientos',
                component: CrudEstacionamientosComponent
            },
            {
                path: 'visitas',
                component: VisitasComponent,
                canActivate: [AuthmenuGuard],
                data: { role: 'admin' }
            },
            {
                path: 'crud-visitas',
                component: CrudVisitasComponent
            },
            {
                path: 'propiedad',
                component: PropiedadComponent,
                canActivate: [AuthmenuGuard],
                data: { role: 'admin' }
            },
            {
                path: 'crud-propiedad',
                component: CrudPropiedadComponent,
                canActivate: [AuthmenuGuard],
                data: { role: 'admin' }
            },
            {
                path: 'vehiculos',
                component: VehiculosComponent,
                canActivate: [AuthmenuGuard],
                data: { role: 'admin' }
            },
            {
                path: 'crud-vehiculo',
                component: CrudVehiculoComponent
            },
            {
                path: 'zonas',
                component: ZonasComponent,
                canActivate: [AuthmenuGuard],
                data: { role: 'admin' }
            },
         
            {
                path: 'crud-zonas',
                component: CrudZonasComponent
            },
            {
                path: 'main-menu',
                component: MainMenuComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
