import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private _user: UsersService , private router : Router) {}
 
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['user']
    });
  }


  erreur:string = '';
  signup(): void {
    console.log(this.signupForm.value);
    this.erreur='';
    if (this.signupForm.valid) {
      this._user.signup(this.signupForm.value).subscribe(
        (data) => {
          this.erreur='';
          console.log(data);
          this.router.navigate(['/main/verificationEmail']);
        },
        (error) => {
          console.error(error);
          this.erreur=error.error
          

        }
      );
    } else {
      console.log("Form is invalid");
      alert("Form is invalid")
      
    }
  }
}
