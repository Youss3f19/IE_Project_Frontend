import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  expandedDropdowns: { [key: string]: boolean } = {};

  constructor(private renderer: Renderer2,private usersService: UsersService , private router : Router) { }

  toggleSidebar() {
    const sidebar = document.querySelector("#sidebar");
    sidebar?.classList.toggle("collapsed");
  }

  toggleDropdown(dropdownId: string) {
    this.expandedDropdowns[dropdownId] = !this.expandedDropdowns[dropdownId];
  }

  isExpanded(dropdownId: string) {
    return this.expandedDropdowns[dropdownId];
  }



  logout(): void {
    this.usersService.logout();
    this.router.navigate(['/main/home']); 
  }
}
