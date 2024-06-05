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
  response:any;
  isSubmit:boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private loginService: LoginService, 
    private router: Router) {
      this.response = null;
      this.isSubmit = false;
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.isSubmit = true;
      console.log(this.loginForm)
     this.response =  this.loginService.login(this.loginForm.getRawValue());
     if(this.response){
      localStorage.setItem('user', JSON.stringify(this.response));
      this.router.navigate(['/employee']);
     }
    } else {
      alert("Form is invalid");
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
