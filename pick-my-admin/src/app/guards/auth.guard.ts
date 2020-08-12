import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // return true;
    if (this.authService.isLoggedIn()) {
      // console.log(this.authService.isLoggedIn());
      return true;
      // this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/login']);
      return false;

    }
  }


}
