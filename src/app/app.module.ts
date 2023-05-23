import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

import { AddtokenInterceptor } from '../app/helpers/addtoken.interceptor'

import { SharedmaterialModule } from './shared/sharedmaterial/sharedmaterial.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { FichaestudianteComponent } from './components/dashboard/fichaestudiante/fichaestudiante.component';
import { FichaclaseComponent } from './components/dashboard/fichaclase/fichaclase.component';
import { FootpageComponent } from './components/footpage/footpage.component';
import { InirecuperarComponent } from './components/inirecuperar/inirecuperar.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { EstudianteComponent } from './components/dashboard/estudiante/estudiante.component';
import { CestudianteComponent } from './components/dashboard/cestudiante/cestudiante.component';
import { CclaseComponent } from './components/dashboard/cclase/cclase.component';
import { NavbarAdminComponent } from './components/dashboard/navbar-admin/navbar-admin.component';
import { MatricularComponent } from './components/dashboard/matricular/matricular.component';
import { EditEstudianteComponent } from './components/dashboard/edit-estudiante/edit-estudiante.component';
import { CentroFormacionComponent } from './components/dashboard/centro-formacion/centro-formacion.component';
import { AdminClasesComponent } from './components/dashboard/admin-clases/admin-clases.component';
import { EditClaseComponent } from './components/dashboard/edit-clase/edit-clase.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    FichaestudianteComponent,
    FichaclaseComponent,
    FootpageComponent,
    InirecuperarComponent,
    RecuperarComponent,
    LoadingComponent,
    EstudianteComponent,
    CestudianteComponent,
    CclaseComponent,
    NavbarAdminComponent,
    MatricularComponent,
    EditEstudianteComponent,
    CentroFormacionComponent,
    AdminClasesComponent,
    EditClaseComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedmaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddtokenInterceptor, multi: true },],
})
export class AppModule { }
