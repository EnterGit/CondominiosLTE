import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import { CondominiosComponent } from './pages/condominios/condominios.component';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

//paginas
import { CrudPortonesComponent } from '../app/pages/crud-portones/crud-portones.component';
import { PortonesComponent } from './pages/popup/portones/portones.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfiguracionesComponent } from './pages/configuraciones/configuraciones.component';
import { EstacionamientosComponent } from './pages/estacionamientos/estacionamientos.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { VisitasComponent } from './pages/visitas/visitas.component';

import { PropiedadComponent } from './pages/propiedad/propiedad.component';
import { CrudConfiguracionesComponent } from './pages/popup/crud-configuraciones/crud-configuraciones.component';
import { CrudEstacionamientosComponent } from './pages/popup/crud-estacionamientos/crud-estacionamientos.component';
import { CrudPropiedadComponent } from './pages/popup/crud-propiedad/crud-propiedad.component';
import { CrudVehiculoComponent } from './pages/popup/crud-vehiculo/crud-vehiculo.component';
import { CrudVisitasComponent } from './pages/popup/crud-visitas/crud-visitas.component';
import { CrudZonasComponent } from './pages/popup/crud-zonas/crud-zonas.component';
import { MatInputModule } from '@angular/material/input';
import { ShowforrolesDirective } from './guards/directives/showforroles.directive';
import { CrudCondominiosComponent } from './pages/popup/crud-condominios/crud-condominios.component';



registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
               MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        CondominiosComponent,
        CrudPortonesComponent,
        PortonesComponent,
        ConfiguracionesComponent,
        EstacionamientosComponent,
        VehiculosComponent,
        VisitasComponent,
        PropiedadComponent,
        CrudConfiguracionesComponent,
        CrudEstacionamientosComponent,
        CrudPropiedadComponent,
        CrudVehiculoComponent,
        CrudVisitasComponent,
        CrudZonasComponent,
        ShowforrolesDirective,
        CrudCondominiosComponent,
        
    ],
    imports: [
        MatCardModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatPaginatorModule,
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        })
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
      ShowforrolesDirective
    ]
})
export class AppModule {}