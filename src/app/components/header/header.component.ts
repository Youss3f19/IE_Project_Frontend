import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private usersService: UsersService , private router : Router) { }
  
  ngOnInit(): void {
    this.usersService.isLoggedIn$.subscribe(
      (status: boolean) => {
        this.isLoggedIn = status;
      }
    );
    this.usersService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;  
      console.log(this.isAdmin);
      
    });
  }


  logout(): void {
    this.usersService.logout();
    this.router.navigate(['/main/home']);  

      
  }
}
