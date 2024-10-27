import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  erreur: string = '';

  constructor(private fb: FormBuilder, private _user: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this._user.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.erreur = '';
          localStorage.setItem('token', JSON.stringify(data.mytoken));
          this._user.setLoginStatus(true); 
          
          this._user.checkTokenValidity().then(() => {
            this.router.navigate(['/main/addExam']);
          });
        },
        (error) => {
          console.error(error);
          this.erreur = error.error;
        }
      );
    } else {
      console.log("Form is invalid");
      alert("Form is invalid");
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.login();  
    }
  }
}
