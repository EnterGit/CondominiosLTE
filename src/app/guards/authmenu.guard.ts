import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthmenuGuard implements CanActivate {

  constructor(private appService: AppService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.appService.obtenerProfile();
    const expectedRole = route.data.role;
    if (user && user.ROLE === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
