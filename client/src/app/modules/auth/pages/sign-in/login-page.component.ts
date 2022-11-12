import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  get username() {
    return this.form.controls.username as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  signIn() {
    if(this.form.value.password && this.form.value.username) {
      const password = this.form.value.password 
      const username = this.form.value.username
      this.authService.singIn({password, username})
    }
  }

}
