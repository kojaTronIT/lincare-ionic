import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {
      console.log("IS IT VALID " + localStorage.getItem("isValid"));
      if (localStorage.getItem("isValid") === "true") {
        resolve(true);
      } else {
        localStorage.setItem("messageKey", "CUSTOMMESSAGE");
        console.log(localStorage.getItem("isUserValid") + " NOT VALID");
        this.router.navigate(['/message']);
        resolve(false);
      }
    });

  }
  
}
