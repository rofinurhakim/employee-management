import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', Validators.required],
      remember_me: ['']
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.getRawValue()).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/employee'])
        },
        error: (error) => {
          console.log(error)
        }
      })
    } else {
      alert("Form is invalid");
    }
  }

}
