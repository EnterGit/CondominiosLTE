import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { Observable, map } from 'rxjs';

interface TokenPayload {
    perfil: string;
    email: string;
    Rut: string;
    correo: string;
    ROLE: string;
  }

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) {}

    async loginByAuth({email, password}) {
        try {
            console.log('email', email);
            console.log('password', password);

            const token = await this.getLogin(email, password).toPromise(); //await Gatekeeper.loginByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');

            this.obtenerProfile();
            const salida = this.obtenerProfile();
            console.log(salida.correo);

            
        } catch (error) {
            this.toastr.error(error.message);
            console.log('error', error);
        }
    }


    getLogin(correo: string, password: string): Observable<any> {
        return this.http
        .post('http://localhost:3000/users/login', {
            correo,
            password,
        })
        .pipe(
            map((resp: any) => {
            console.log(' RESP ', resp); // AQUI SE DEBE AGREAR EL TOKEN AL LOCALSTORAGE Y LUEGO REDIRECCIONAR
            this.setToken(resp);          
            //redireccionar a la pagina de inicio
            //this.router.navigate(['newletter']);
            return resp;
            })
        );
    }

    setToken(token: string) {
        const decode = jwtDecode<TokenPayload>(token);
        localStorage.setItem('ROLE', decode.ROLE);
        localStorage.setItem('ACCESO', JSON.stringify(token));
        localStorage.setItem('RUT', JSON.stringify(decode.Rut));
        localStorage.setItem('CORREO', JSON.stringify(decode.correo));
        localStorage.setItem('Perfil', decode.perfil);
        localStorage.setItem('userData', decode.perfil);
    }


    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
            console.log("ROLE" + localStorage.getItem('ROLE'));
            this.user = this.obtenerProfile(); //localStorage.getItem('ROLE');  //await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    obtenerProfile() {
        const token = localStorage.getItem('token');
        const decode = jwtDecode<TokenPayload>(token);
        console.log('DECODE', decode);
        const currentPage = this.router.url;
        console.log('La página actual es', currentPage);
        return decode;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        localStorage.removeItem('ROLE');
        localStorage.removeItem('ACCESO');
        localStorage.removeItem('RUT');
        localStorage.removeItem('CORREO');
        localStorage.removeItem('Perfil');
        localStorage.removeItem('userData');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
