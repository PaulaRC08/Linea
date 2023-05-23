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
import { CentroformacionService } from 'src/app/services/centroformacion.service';
import { centroFormacion } from 'src/app/models/centroFormacion';

@Component({
  selector: 'app-centro-formacion',
  templateUrl: './centro-formacion.component.html',
  styleUrls: ['./centro-formacion.component.scss']
})
export class CentroFormacionComponent {

  clases: any = []; 
  hide = true;
  centroFormacion: FormGroup;
  
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private claseService: ClasesService,
    private centroService: CentroformacionService){
      this.centroFormacion = this.fb.group({
        nombre: ['', [Validators.required,Validators.maxLength(50)]],
        direccion: ['', [Validators.required,Validators.maxLength(30)]]
        });
  }


  crearCentro(){

    const centro: centroFormacion ={
      Nombrecentro: this.centroFormacion.value.nombre,
      Direccion: this.centroFormacion.value.direccion
    };

    this.centroService.addCentro(centro).subscribe(data => {
      this.snackBar.open("Centro Creado", '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/dashboard/admin'])
    }, error => {
      console.log(error.error.message);
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }
}
