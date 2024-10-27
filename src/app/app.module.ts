import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { SectionComponent } from './components/section/section.component';
import { ExamsComponent } from './components/exams/exams.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { InViewDirective } from './directives/in-view.directive';
import {HttpClientModule} from '@angular/common/http';
import { VerificationEmailComponent } from './components/verification-email/verification-email.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { MainLayoutComponentComponent } from './components/main-layout-component/main-layout-component.component';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    Error404Component,
    SectionComponent,
    ExamsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    InViewDirective,
    VerificationEmailComponent,
    ConfirmComponent,
    DashboardComponent,
    AddExamComponent,
    MainLayoutComponentComponent,
    HomeDashboardComponent,
    LoaderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
