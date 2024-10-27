import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { SectionComponent } from './components/section/section.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ContactComponent } from './components/contact/contact.component';
import { VerificationEmailComponent } from './components/verification-email/verification-email.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { addExamGuard } from './guards/add-exam.guard';
import { noLoggedInGuard } from './guards/no-logged-in.guard';
import { MainLayoutComponentComponent } from './components/main-layout-component/main-layout-component.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { isAdminGuard } from './guards/is-admin.guard';
import { ClasseGuard } from './guards/classe.guard';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';

const routes: Routes = [
  { path: '',   redirectTo: '/main/home' , pathMatch: 'full' },

  { path: 'main', component: MainLayoutComponentComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'section/:num', component: SectionComponent},
      { path: 'login', component: LoginComponent, canActivate: [noLoggedInGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [noLoggedInGuard] },
      { path: 'exams/:classe', component: ExamsComponent, canActivate: [ClasseGuard] }, 
      { path: 'contact', component: ContactComponent },
      { path: 'verificationEmail', component: VerificationEmailComponent },
      { path: 'confirm/:code', component: ConfirmComponent },
      { path: 'addExam', component: AddExamComponent, canActivate: [addExamGuard] },
      { path: 'addExam/:id', component: AddExamComponent, canActivate: [isAdminGuard] },

    ]
  },
  { path: 'dashboard', component: DashboardComponent ,  
    children: [
      { path: '', component: HomeDashboardComponent},
      { path: 'home', component: HomeDashboardComponent},
      { path: 'exams/:status', component: ExamsComponent},
      { path: 'modifyExam/:id', component: AddExamComponent},



    ]
  },

  { path: '**', component: Error404Component },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
