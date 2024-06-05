import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  employeeInfo: any;
  constructor(
    private employeeService: EmployeeService,
    public loginService: LoginService
  ) {
    this.employeeInfo = this.employeeService.getUserInfo();
  }

  logout() {
    this.loginService.logout();
  }
}
