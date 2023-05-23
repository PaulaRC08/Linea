import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent {

  haveEstudiantes: boolean= false;
  idEstudiante?: number;
  idUsuario?: number;
  nombre?: String;
  apellido?: String;
  codigo?: String;
  identificacion?: String;
  clases?: any = [];

  constructor(private router:Router,
    private snackBar: MatSnackBar,
    private reactiveFormsModule:ReactiveFormsModule,
    private estudianteService: EstudiantesService,
    private loginService: LoginService,
    private clasesService: ClasesService){}

    ngOnInit(): void{
      this.idUsuario = this.loginService.getTokenDecoded().IdUsuario;
      this.llenarInfo();
    }  
  
    llenarInfo(){
      //this.idEstudiante!
      this.estudianteService.getEstudianteUsuario(this.idUsuario!).subscribe(data => {
        
  
        this.nombre = data.nombre.toUpperCase();
        this.apellido = data.apellido.toUpperCase();
        this.codigo = data.codigoestudiante;
        this.identificacion = data.numeroidentificacion;
        this.clases = data.tbEstudianteclases;
        if( this.clases.length != 0 ){
          this.haveEstudiantes= false;
        }else{
          this.haveEstudiantes= true;
        }
        console.log(this.clases);
  
      }, error => {
        this.snackBar.open(" ERROR: "+ (error.error.message), '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      });
    }
  
    fichaClase(idClase: number){
      this.clasesService.idClase = idClase;
      this.router.navigate(['/dashboard/fclase'])
    }
  
    getColor(i: number) {
      if (i % 2 == 0) {
        return "#333333";
      } else{
        return "#091E0A";
      }
    }
  
    logOut(): void{
      this.router.navigate(['/inicio'])
    }

}
