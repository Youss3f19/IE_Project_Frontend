import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/header/footer/footer.component';
import { HomeComponent } from './components/header/home/home.component';
import { Error404Component } from './components/header/error404/error404.component';
import { SectionComponent } from './components/header/section/section.component';
import { ExamsComponent } from './components/header/exams/exams.component';
import { LoginComponent } from './components/header/login/login.component';
import { SignupComponent } from './components/header/signup/signup.component';
import { ContactComponent } from './components/header/contact/contact.component';
import { InViewDirective } from './directives/in-view.directive';
import {HttpClientModule} from '@angular/common/http';
import { VerificationEmailComponent } from './components/header/verification-email/verification-email.component';
import { ConfirmComponent } from './components/header/confirm/confirm.component';
import { DashboardComponent } from './components/header/dashboard/dashboard.component';
import { AddExamComponent } from './components/header/add-exam/add-exam.component';


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
