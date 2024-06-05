import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../services/util.service';
import { Iemployee } from '../../../interface/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  users: any[] = [];
  searchText = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedEmployees: Iemployee[] = [];
  sortBy: string = 'firstName';
  sortOrder: string = 'asc';
  paginationInfo: string = '';
  

  constructor(
    private employeeService: EmployeeService,
    private utilService: UtilService,
    private router: Router
    
    ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee(): void {
    // get ti local storage
    const newEmployees = JSON.parse(localStorage.getItem('newEmployees') || '[]');
    this.users = [...this.employeeService.getAllEmployee(), ...newEmployees].map((employee: any) => {
      return {
        ...employee,
        basicSalary: this.utilService.prettyPrice(employee.basicSalary),
      };
    });
    this.updatePagination();
  }

  paginate(employees: Iemployee[], page: number, limit: number): Iemployee[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return employees.slice(start, end);
  }
  
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEmployees = this.users.slice(start, end);
    this.paginationInfo = `Showing ${start + 1} to ${end} of ${this.users.length} entries`;
  }


  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  setLimit(event: any): void {
    const { target: { value } } = event;
    this.itemsPerPage = Number(value);
    this.updatePagination();
  }


  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  onSearch(): void {
    console.info('masuk');
    this.currentPage = 1;
    this.itemsPerPage = 5;
    if (this.searchText) {
      this.paginatedEmployees = this.users.filter((user: any) => {
        return user.firstName.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.updatePagination();
    }
  }
  
  sortTable(column: string): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc'? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    this.users.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a[this.sortBy].localeCompare(b[this.sortBy]);
      } else {
        return b[this.sortBy].localeCompare(a[this.sortBy]);
      }
    });

    this.updatePagination();
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
    this.users = this.users.filter((user) => user.id !== id);
    this.updatePagination();
    Swal.fire({
      title: 'Deleted!',
      text: 'Employee has been deleted successfully.',
      icon: 'success',
      background: 'red',
      color: 'white',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'custom-swal-toast-delete'
      }
    });
  }
  

  editEmployee(id: number): void {
    Swal.fire({
      title: 'Edited!',
      text: 'Employee has been edited successfully.',
      icon: 'success',
      background: 'yellow',
      color: 'black',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'custom-swal-toast-edit' 
      }
    });
  }
  
  detailEmployee(id: number): void {
    this.router.navigate(['employee', id]);
  }
  addEmployee(): void {
    this.router.navigate(['employee/add']);
  }
}
