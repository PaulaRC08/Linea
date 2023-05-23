import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {

  isAdmin = false;
  ruta?: string;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private loginService: LoginService,
    private estudianteService: EstudiantesService){

  }

  ngOnInit(): void{
    if(this.loginService.Administrador){
      this.isAdmin = true;
      this.ruta = "/dashboard/admin";
    }else{
      this.isAdmin = false;
      this.ruta = "/dashboard/estudiante";
    }
  }

  logOut(): void{
    this.estudianteService.idEstudiante = undefined;
    this.estudianteService.idUsuario = undefined;
    this.loginService.Administrador = undefined;
    this.loginService.removeLocalStorage();
    this.router.navigate(['/inicio'])
  }

  centro(): void{
    this.router.navigate(['/dashboard/centroFormacion'])
  }

  estudiante(): void{
    this.router.navigate(['/dashboard/cestudiante'])
  }

  clase(): void{
    this.router.navigate(['/dashboard/cclase'])
  }

  matricular(): void{
    this.router.navigate(['/dashboard/matricular'])
  }
}
