import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://127.0.0.1:3001/user/';
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private isAdminStatus = new BehaviorSubject<boolean>(false); 

  isLoggedIn$ = this.loggedInStatus.asObservable();
  isAdmin$ = this.isAdminStatus.asObservable(); 

  constructor(private http: HttpClient) {
    this.checkTokenValidity();
  }

  checkTokenValidity(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn(JSON.parse(token)).subscribe(
          (response: any) => {
            if (response.login) {
              this.loggedInStatus.next(true);
              this.isAdminStatus.next(response.isAdmin); 
              resolve(true);
            } else {
              this.loggedInStatus.next(false);
              resolve(false);
            }
          },
          () => {
            this.loggedInStatus.next(false);
            resolve(false);
          }
        );
      } else {
        this.loggedInStatus.next(false);
        resolve(false);
      }
    });
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
    this.isAdminStatus.next(false); 
  }

  setLoginStatus(status: boolean) {
    this.loggedInStatus.next(status);
  }

  isAdmin(): boolean {
    return this.isAdminStatus.value; 
  }
}
