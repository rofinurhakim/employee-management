import { Injectable } from '@angular/core';
import { CanActivate, CanMatch } from '@angular/router';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root', // Ensure the guard is provided in the root injector
})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authService: LoginService,
    private router: Router,
  ) {}

  canMatch(route: Route, segments: UrlSegment[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.isSignedIn().pipe().subscribe(
        (isSignedIn) => {
          if (!isSignedIn) {
            this.router.navigate(['login'], { queryParams: { redirect: segments.join('/') } });
            resolve(false);
          } else {
            resolve(true);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let result = false;
    this.authService.isSignedIn().pipe().subscribe(signedIn => {
      if (!signedIn) {
        this.router.navigate(['login'], { queryParams: { redirect: state.url } });
        result = false;
      }
      result = true;
    });

    return result;
  }
}