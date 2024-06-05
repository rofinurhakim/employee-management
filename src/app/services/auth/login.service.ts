import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as employee from '../../../employee.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private signedInSubject: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
  ) { 
    const isSignedIn = localStorage.getItem('user') !== null;
    this.signedInSubject = new BehaviorSubject<boolean>(isSignedIn);
  }

  login(payload: { username: string, password: string }) {
    const objUser = employee.employees.find(x => x.username === payload.username && x.password === payload.password);
    if (objUser) {
      localStorage.setItem('user', JSON.stringify(objUser));
      this.signedInSubject.next(true);
      return objUser;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('user');
    this.signedInSubject.next(false);
    this.router.navigate(['login']);
  }

  isSignedIn(): Observable<boolean> {
    return this.signedInSubject.asObservable();
  }
}
