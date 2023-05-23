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

@Component({
  selector: 'app-edit-estudiante',
  templateUrl: './edit-estudiante.component.html',
  styleUrls: ['./edit-estudiante.component.scss']
})
export class EditEstudianteComponent {

  idEstudiante?: number;
  estudianteClass?: any;
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
        usuario: ['', Validators.required,Validators.maxLength(30)]
        });
  }

  ngOnInit(): void{
    this.idEstudiante = this.estudianteService.idEstudiante;
    this.llenarInfo();
  } 

  llenarInfo(){
    //this.idEstudiante!
    this.estudianteService.getEstudiante(this.idEstudiante!).subscribe(data => {
      this.estudianteClass = data;
      this.estudiante.controls['nombre'].setValue(data.nombre);
      this.estudiante.controls['apellido'].setValue(data.apellido);
      this.estudiante.controls['codigo'].setValue(data.codigoestudiante);
      this.estudiante.controls['numero'].setValue(data.numeroidentificacion);
      this.estudiante.controls['email'].setValue(data.idusuarioNavigation.email);
      this.estudiante.controls['usuario'].setValue(data.idusuarioNavigation.usuario);

      console.log(this.clases);

    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

  editarEstudiante(){
    this.estudianteClass.nombre = this.estudiante.value.nombre;
    this.estudianteClass.apellido = this.estudiante.value.apellido;
    this.estudianteClass.codigoestudiante = this.estudiante.value.codigo;
    this.estudianteClass.numeroidentificacion = this.estudiante.value.numero;
    this.estudianteClass.idusuarioNavigation.usuario = this.estudiante.value.usuario;
    this.estudianteClass.idusuarioNavigation.email = this.estudiante.value.email;
    console.log(this.estudianteClass);

    this.estudianteService.editarEstudiante(this.estudianteClass).subscribe(data => {
      
      console.log(data.message);
      if( data.message == "Editado"){
        this.snackBar.open("Estudiante actualizado!", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/dashboard/admin'])
      }

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
