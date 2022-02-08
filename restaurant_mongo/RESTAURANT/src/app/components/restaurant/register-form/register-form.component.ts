import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  modelForm: FormGroup;
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.modelForm = this.formBuilder.group({
      nick: ['qwe', Validators.required],
      email: ['qwe', Validators.email],
      password: ['qwe', Validators.required],
      password_confirm: ['qwe', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.checkAuth().subscribe((data: any) => {
      if (data.action == 'VERIFIED') {
        this.router.navigate(['/dishes']);
      }
    });
  }

  registerUser(): void {
    if (this.modelForm.valid) {
      if (
        this.modelForm.value.password == this.modelForm.value.password_confirm
      ) {
        this.userService
          .registerUser(this.modelForm.value)
          .subscribe((data: any) => {
            if (data.action == 'USER_REGISTERED') {
              const dataToPass = {
                nick: data.user,
                role: data.role,
                isLoggedIn: true,
              };
              this.userService.changeUser(dataToPass);
              this.router.navigate(['/dishes']);
            } else if (data.action == 'USER_EXISTS') {
              this.emailError = 'Email już jest zajęty';
            }
          });
      } else {
        this.emailError = '';
        this.passwordError = 'Hasła są różne';
      }
    } else {
      this.emailError = 'Email jest niepoprawny lub jakieś pole zostało puste';
    }
  }

  clearEmailError(): void {
    this.emailError = '';
  }

  clearPasswordError(): void {
    this.passwordError = '';
  }

  clearErrors(): void {
    this.emailError = '';
    this.passwordError = '';
  }
}
