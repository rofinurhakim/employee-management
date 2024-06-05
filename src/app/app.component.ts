import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Note the correct plural form for 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'employee-management';
  isSignedIn = false;

  constructor(
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.isSignedIn().subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;
    });
  }
}
