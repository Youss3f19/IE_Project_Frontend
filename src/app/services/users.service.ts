import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://127.0.0.1:3001/user/';
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedInStatus.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn(JSON.parse(token)).subscribe(
        (response: any) => {
          if (response.login) {
            this.loggedInStatus.next(true);
          }
        },
        () => {
          this.loggedInStatus.next(false);
        }
      );
    }
  }

  login(form: any) {
    return this.http.post(this.url + 'login', form);
  }

  signup(form: any) {
    return this.http.post(this.url + 'signup', form);
  }

  verifyAccount(activationCode: any) {
    return this.http.post(this.url + 'verifyUser/' + activationCode, {});
  }

  isLoggedIn(token: any) {
    return this.http.post(this.url + 'verifyToken', { token });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInStatus.next(false); 
  }


  setLoginStatus(status: boolean) {
    this.loggedInStatus.next(status);
  }
}
