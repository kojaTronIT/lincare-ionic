import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      console.log("IS IT VALID " + localStorage.getItem("isUserValid"));
      if (localStorage.getItem("isUserValid") === "true") {
        resolve(true);
      } else {
        console.log(localStorage.getItem("isUserValid") + " NOT VALID");
        this.router.navigate(['/message']);
        resolve(false);
      }
    });
  }
  
}
