import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as employee from '../../../employee.json';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) {}
 
  getAllEmployee(): any {
    return employee.employees;
  }
  getDetailEmployee(id: number): any {
    return employee.employees.find(x => x.id === id);
  }
  deleteEmployee(id: number): any {
    return employee.employees.filter(x => x.id !== id);
  }
  getUserInfo() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  }
  addUser(payload: { id: number; username: string; password: string; firstName: string; lastName: string; email: string; birthDate: string; basicSalary: number; status: string; group: string; description: string; }): any {
    return employee.employees.push(payload);
  }
  
}
