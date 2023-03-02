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
      email: ['admin@admin.admin', Validators.email],
      password: ['adminek'],
    });
  }

  ngOnInit(): void {
    this.userService.checkAuth().subscribe((data: any) => {
      if (data != null)
        this.router.navigate(['/dishes']);
    });
  }

  loginUser(): void {
    if (this.modelForm.valid) {
      this.userService
        .loginUser(this.modelForm.value)
        .then((data: any) => {
          this.router.navigate(['/dishes']);
        }).catch((error => {
          this.clearErrors()
          if (error.message.includes("auth/invalid-email"))
            this.emailError = "Email jest niepoprawny"
          if (error.message.includes("auth/user-not-found"))
            this.emailError = "Nie ma takiego użytkownika"
          else if (error.message.includes("auth/wrong-password"))
            this.passwordError = "Złe hasło"
          else
            this.emailError = "Coś poszło nie tak"
        }))
    } else {
      this.emailError = 'Email jest niepoprawny';
    }
  }

  clearErrors(): void {
    this.emailError = '';
    this.passwordError = '';
  }
}
