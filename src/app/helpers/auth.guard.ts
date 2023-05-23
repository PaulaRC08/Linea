import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: ActivatedRoute,
    private router:Router,
    private loginService: LoginService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  if(this.loginService.getToken()==null){
  console.log("ruta protegida");
  this.router.navigate(['/inicio/login']);
  }

  let url: string = state.url;

  return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.loginService.getToken()) {
      var rol = this.loginService.getTokenDecoded()["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      const userRole = rol;
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/inicio']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/inicio']);
    return false;
  }
}
