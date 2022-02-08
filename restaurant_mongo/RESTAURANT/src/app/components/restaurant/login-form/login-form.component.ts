import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  modelForm: FormGroup;
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.modelForm = this.formBuilder.group({
      email: ['qwe@qwe.qwe', Validators.email],
      password: ['qwe'],
    });
  }

  ngOnInit(): void {
    this.userService.checkAuth().subscribe((data: any) => {
      if (data.action == 'VERIFIED') {
        this.router.navigate(['/dishes']);
      }
    });
  }

  loginUser(): void {
    if (this.modelForm.valid) {
      this.userService
        .loginUser(this.modelForm.value)
        .subscribe((data: any) => {
          if (data.action == 'USER_LOGGED') {
            const dataToPass = {
              nick: data.user,
              role: data.role,
              isLoggedIn: true,
            };
            this.userService.changeUser(dataToPass);
            this.router.navigate(['/dishes']);
          } else if (data.action == 'WRONG_PASSWORD') {
            this.passwordError = 'Złe hasło';
          } else if (data.action == 'USER_DOESNT_EXIST') {
            this.emailError = 'Nie ma takiego użytkownika';
          }
        });
    } else {
      this.emailError = 'Email jest niepoprawny';
    }
  }

  clearErrors(): void {
    this.emailError = '';
    this.passwordError = '';
  }
}
