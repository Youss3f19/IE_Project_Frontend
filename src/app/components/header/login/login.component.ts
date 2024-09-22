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

  constructor(private fb: FormBuilder, private _user: UsersService , private router : Router) {}
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }


  erreur:string = '';
  token:string = ''
  login(): void {
    if (this.loginForm.valid) {
      this._user.login(this.loginForm.value).subscribe(
        (data:any) => {
          this.erreur='';
          localStorage.setItem('token', JSON.stringify(data.mytoken));
          this._user.setLoginStatus(true); 
          this.router.navigate(['/addExam']);
          
        },
        (error) => {
          console.error(error);
          this.erreur=error.error
            

        }
      );
    } else {
      console.log("Form is invalid");
      alert("Form is invalid");
      
    }
  }
}
