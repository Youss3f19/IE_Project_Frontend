import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/header/home/home.component';
import { Error404Component } from './components/header/error404/error404.component';
import { SectionComponent } from './components/header/section/section.component';
import { LoginComponent } from './components/header/login/login.component';
import { SignupComponent } from './components/header/signup/signup.component';
import { ExamsComponent } from './components/header/exams/exams.component';
import { ContactComponent } from './components/header/contact/contact.component';
import { VerificationEmailComponent } from './components/header/verification-email/verification-email.component';
import { ConfirmComponent } from './components/header/confirm/confirm.component';
import { AddExamComponent } from './components/header/add-exam/add-exam.component';
import { addExamGuard } from './guards/add-exam.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/home' , pathMatch: 'full'   },
  { path: 'home', component: HomeComponent},
  { path : 'section' , component : SectionComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'signup' , component: SignupComponent},
  { path: 'exams', component: ExamsComponent },
  { path : 'contact' , component: ContactComponent},
  { path : 'verificationEmail' , component: VerificationEmailComponent},
  { path : 'confirm/:code' , component: ConfirmComponent},
  { path: 'addExam', component: AddExamComponent, canActivate: [addExamGuard] } ,

  { path: '**', component: Error404Component},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
