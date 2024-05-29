
import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  newEmployee = {
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onAddEmployee(): void {
    this.employeeService.addUser(this.newEmployee).subscribe(() => {
      this.router.navigate(['/employee-list']);
    });
  }
}
