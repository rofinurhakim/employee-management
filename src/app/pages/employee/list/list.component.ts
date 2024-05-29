import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  currentPage = 1;
  pageSize = 100;
  totalItems = 0;
  users: any[] = [];
  searchText = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeeService.getUsers(this.currentPage, this.pageSize, this.searchText)
      .subscribe((response: any) => {
        this.users = response.data;
        this.totalItems = response.total;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadData();
  }
}
