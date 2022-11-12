import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ErrorService } from '../../../shared/services/error.service';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    public router: Router,
    public errorService: ErrorService
  ) { }

  endpoint: string = 'http://localhost:4000/api';

  handleError(error: HttpErrorResponse) {
    let msg = ''
    if(error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message
    } else {
      // server-side error
      msg = `Error Code ${error.status}\nMessage: ${error.message}`
    }
    this.errorService.handle('Input data is incorrect!')
    return throwError(msg)
  }

  // Sign-up
  signUp(user: User) {
    let api = `${this.endpoint}/register-user`
    return this.http.post(api, user).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  // Sign-in
  singIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        window.location.reload()
          this.router.navigate([''])
      })
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken()
    return authToken === null ? false : true
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token')
    if(removeToken === null) {
      this.router.navigate(['auth'])
    }
  }

}