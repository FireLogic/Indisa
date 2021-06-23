import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Si el usuario está autentificado puede ingresar al sistema.
    if (this.authService.isLoggedIn == true) {
      // Se definen los permisos para cada ruta y acción
      const permiso = next.data.permiso;
      // Si el usuario tiene los permisos correspondientes puede navegar por cada ruta.
      if (this.authService.validarPermisoUsuario(permiso)) {
        return true;
      }
      // Si el usuario no tiene los permisos para una ruta específica es redirigido a una página de error.
      else {
        return this.router.navigate(['dashboard'], { skipLocationChange: true });
      }
    }
    // Si el usuario no está autentificado es redirigido a la página de login.
    else {
      return this.router.navigate(['login']);
    }

  }

}
