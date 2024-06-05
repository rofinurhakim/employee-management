import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {EnumEmployeeGroup} from '../../../interface/employee';



export interface IEnumEmployeeGroup {
  [key: string]: EnumEmployeeGroup;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  title = 'employee-management';
  employeeForm!: FormGroup;
  today: string | undefined;
  groups = Object.keys(EnumEmployeeGroup).map(key => ({ value: EnumEmployeeGroup[key as keyof typeof EnumEmployeeGroup], label: key }));

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.maxDateValidator(this.today)]],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  maxDateValidator(maxDate: string) {
    return (control: { value: string }) => {
      const date = new Date(control.value);
      if (date > new Date(maxDate)) {
        return { maxDate: true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.employeeForm?.valid) {
        console.log('Form Submitted', this.employeeForm.value);
        const payload = this.employeeForm.value;
        payload.basicSalary = Number(payload.basicSalary);
    
        let newEmployees = JSON.parse(localStorage.getItem('newEmployees') || '[]');

        if (newEmployees && newEmployees.length > 0) {
            newEmployees.push(this.employeeForm.value);
        } else {
            newEmployees = [this.employeeForm.value];
        }
        localStorage.setItem('newEmployees', JSON.stringify(newEmployees));
        this.router.navigate(['/employee']);
    }
}


  onCancel(): void {
    this.router.navigate(['/']);
  }
}
