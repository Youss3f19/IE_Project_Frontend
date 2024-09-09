import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/header/home/home.component';
import { Error404Component } from './components/header/error404/error404.component';
import { SectionComponent } from './components/header/section/section.component';
import { LoginComponent } from './components/header/login/login.component';
import { SignupComponent } from './components/header/signup/signup.component';
import { ExamsComponent } from './components/header/exams/exams.component';
import { ContactComponent } from './components/header/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path : 'section' , component : SectionComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'signup' , component: SignupComponent},
  { path: 'exams', component: ExamsComponent },
  { path : 'contact' , component: ContactComponent},

  { path: '**', component: Error404Component},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
