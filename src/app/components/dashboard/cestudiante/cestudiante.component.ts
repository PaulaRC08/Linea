import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { UserEstudiante } from 'src/app/models/userEstudiante';
import { EstudianteClase } from 'src/app/models/estudianteclase';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { Estudiante } from 'src/app/models/estudiante';
import { ClasesService } from 'src/app/services/clases.service';
import { PasswordStrengthValidator } from 'src/app/shared/Util/password-strength.validators';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cestudiante',
  templateUrl: './cestudiante.component.html',
  styleUrls: ['./cestudiante.component.scss']
})
export class CestudianteComponent {
  clases: any = []; 
  hide = true;
  estudiante: FormGroup;
  
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private claseService: ClasesService,
    private estudianteService: EstudiantesService){
      this.estudiante = this.fb.group({
        nombre: ['', [Validators.required,Validators.maxLength(50)]],
        apellido: ['', [Validators.required,Validators.maxLength(50)]],
        codigo: ['', [Validators.required,Validators.maxLength(15)]],
        numero: ['', [Validators.required,Validators.maxLength(12)]],
        email: ['', [Validators.required,Validators.email,Validators.maxLength(30)]],
        usuario: ['', [Validators.required,,Validators.maxLength(30)]],
        pass: ['', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]]
        });
  }

  guardarEstudiante():void{

    const usuarioEstudiante: UserEstudiante = new UserEstudiante(
      this.estudiante.value.usuario,
      this.estudiante.value.pass,
      this.estudiante.value.email
    );
    console.log(usuarioEstudiante);
    const estudiante: Estudiante = {
      nombre: this.estudiante.value.nombre,
      apellido: this.estudiante.value.apellido,
      codigoestudiante: this.estudiante.value.codigo,
      numeroidentificacion: this.estudiante.value.numero,
      idusuarioNavigation: usuarioEstudiante
    }
    console.log(estudiante);

    this.estudianteService.addEstudiante(estudiante).subscribe(data => {
      console.log(data);
      if(data.message =="Usuario ya existe"){
        this.estudiante.get("usuario")?.setValue("");
        this.snackBar.open(" USUARIO YA EXISTE", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }else{
        this.snackBar.open("CREADO CON EXITO", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
          this.router.navigate(['/dashboard/matricular'])
      }
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });

  }

}
