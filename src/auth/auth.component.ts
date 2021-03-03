import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth-service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;
  erorsDuringLogin = false;

  constructor(private authService: AuthService, private  router: Router) {

  }

  loginProcess(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        data => {
          localStorage.removeItem('token');
          localStorage.setItem('token', data);
          this.obtainUserData();
        },
        error => {
          this.erorsDuringLogin = true;
          console.log(error);
        });
    }
  }

  toMainPage(): void {
    console.log('Navigated');
    this.router.navigateByUrl('');
  }

  obtainUserData(): void {
    this.authService.obtainProfile().subscribe(
      data => {
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.authorities[0].authority);
        console.log('Stored data');
        this.toMainPage();
      },
      error => console.log(error));
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  clearAuthInfo(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }


}
