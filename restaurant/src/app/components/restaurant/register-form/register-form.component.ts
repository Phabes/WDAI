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
      nick: ['admin', Validators.required],
      email: ['admin@admin.admin', Validators.email],
      password: ['adminek', Validators.required],
      password_confirm: ['adminek', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.checkAuth().subscribe((data: any) => {
      if (data != null)
        this.router.navigate(['/dishes']);
    });
  }

  registerUser(): void {
    if (this.modelForm.valid) {
      if (
        this.modelForm.value.password == this.modelForm.value.password_confirm
      ) {
        const userData = this.modelForm.value
        this.userService
          .registerUser(userData.email, userData.password)
          .then((data: any) => {
            this.userService.registerUserInDatabase(userData, data.user.uid)
              .then(() => {
                const dataToPass = {
                  nick: userData.nick,
                  role: "client",
                  isLoggedIn: true,
                };
                this.userService.changeUser(dataToPass);
                this.router.navigate(['/dishes']);
              })
          }).catch((error) => {
            this.clearErrors()
            if (error.message.includes("auth/email-already-in-use"))
              this.emailError = 'Email już jest zajęty';
            else if (error.message.includes("auth/weak-password"))
              this.passwordError = 'Za słabe hasło';
            else if (error.message.includes("auth/invalid-email"))
              this.emailError = "Email jest niepoprawny"
            else
              this.emailError = "Coś poszło nie tak"
          })
      } else {
        this.clearErrors()
        this.passwordError = 'Hasła są różne';
      }
    } else {
      this.clearErrors()
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
