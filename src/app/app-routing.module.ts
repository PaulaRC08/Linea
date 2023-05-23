import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FichaclaseComponent } from './components/dashboard/fichaclase/fichaclase.component';
import { FichaestudianteComponent } from './components/dashboard/fichaestudiante/fichaestudiante.component';
import { LoginComponent } from './components/login/login.component';
import { InirecuperarComponent } from './components/inirecuperar/inirecuperar.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { EstudianteComponent } from './components/dashboard/estudiante/estudiante.component';
import { CestudianteComponent } from './components/dashboard/cestudiante/cestudiante.component';
import { CclaseComponent } from './components/dashboard/cclase/cclase.component';
import { MatricularComponent } from './components/dashboard/matricular/matricular.component';
import { EditEstudianteComponent } from './components/dashboard/edit-estudiante/edit-estudiante.component';
import { CentroFormacionComponent } from './components/dashboard/centro-formacion/centro-formacion.component';
import { AdminClasesComponent } from './components/dashboard/admin-clases/admin-clases.component';
import { EditClaseComponent } from './components/dashboard/edit-clase/edit-clase.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: "full"},  
  { path: 'inicio', component: LoginComponent},
  { path: 'recuperar', component: InirecuperarComponent},
  { path: 'cambiarPass', component: RecuperarComponent},
  { path: 'dashboard', component: DashboardComponent, children:[
    { path: '', component: AdminComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'centroFormacion', component: CentroFormacionComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'adminClases', component: AdminClasesComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'estudiante', component: EstudianteComponent, canActivate: [AuthGuard],data: {role: 'False'}  },
    { path: 'cestudiante', component: CestudianteComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'editarEstudiante', component: EditEstudianteComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'editarClase', component: EditClaseComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'cclase', component: CclaseComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'matricular', component: MatricularComponent, canActivate: [AuthGuard],data: {role: 'True'}  },
    { path: 'festudiante', component: FichaestudianteComponent, canActivate: [AuthGuard],data: {role: ['True','False'],}  },
    { path: 'fclase', component: FichaclaseComponent, canActivate: [AuthGuard],data: {role: ['True','False']} },
  ]},
  { path: '**', redirectTo: '/inicio', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
