import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Iemployee } from '../../../interface/employee';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  employeeId: number | undefined;
  employee: Iemployee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeId = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employee = this.employeeService.getDetailEmployee(Number(this.employeeId));
    }
  }

  goBack(): void {
    this.router.navigate(['/employee']);
  }
}