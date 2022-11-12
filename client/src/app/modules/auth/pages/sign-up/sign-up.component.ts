import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
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

  signUp() {
    if(this.form.value.password && this.form.value.username) {
      const password = this.form.value.password 
      const username = this.form.value.username
      this.authService.signUp({username, password, _id: Math.random()}).subscribe(res => {
        if(res) {
          this.form.reset()
          this.router.navigate(['sign-in'])
        }
      })
    }
    // console.log(this.form.value);
  }

}
