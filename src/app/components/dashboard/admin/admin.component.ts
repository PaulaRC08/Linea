import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable'
import { Filtro } from 'src/app/models/filtro';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  filtros: FormGroup;
  Estudiantes: any = [];
  haveEstudiantes = false;

  //PDF REPORT
  CabeceroEstudiantes: any = [["ID", "Nombre", "Numero Identificacion", "Codigo"]];
  TodosEstudiantes: any = [];
  TodosEstudiantesOf: any = [];

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private estudianteService: EstudiantesService){
      this.filtros = this.fb.group({
        identificacion: ['',Validators.maxLength(12)],
        nombre: ['',Validators.maxLength(50)],
        apellido: ['',Validators.maxLength(50)],
        });
  }

  ngOnInit(): void{
    this.listEstudiantes();
  }

  generarPDF(){
    this.TodosEstudiantesOf.length = 0;
    var contador: number = 0;
    this.estudianteService.listEstudiantes().subscribe(data => {
        console.log(data);
        if( data.length != 0 ){
          this.TodosEstudiantes = data;

          for(let student of this.TodosEstudiantes){
            contador++;
            var st = [contador,(student.nombre+" "+student.apellido),student.numeroidentificacion, student.codigoestudiante];
            this.TodosEstudiantesOf.push(st);
          }
      
          console.log(this.TodosEstudiantes);
          var pdf = new jsPDF();
          var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
      
          pdf.setFontSize(20);
          pdf.text("REPORTE DE ESTUDIANTES", pageWidth / 2, 10, {align: 'center'});
      
          autotable(pdf, {
            margin: { left: 10, right: 10, top: 20, bottom: 30 },
            head: this.CabeceroEstudiantes,
            body: this.TodosEstudiantesOf,
            theme: 'grid',
            headStyles: {
              fillColor: [27, 94, 31]
            },
            didDrawCell: (data: { column: { index: any; }; }) => {
              console.log(data.column.index)
            }
          });
          pdf.output('dataurlnewwindow');
          pdf.save('ReporteEstudiantes.pdf');

        }else{
          this.snackBar.open("SIN DATOS", '',{
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
    
    
  }

  listEstudiantes():void{
    const filtros: Filtro ={
      identificacion: '',
      nombre: '',
      apellido: '',
    };

    this.estudianteService.filtrolistEstudiantes(filtros).subscribe(data => {
      
      if( data.length != 0 ){
        this.haveEstudiantes= false;
        this.Estudiantes = data;
        //this.TodosEstudiantes = data;
      }else{
        this.haveEstudiantes= true;
      }
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

  filtrar(){
    const filtros: Filtro ={
      identificacion: this.filtros.value.identificacion,
      nombre: this.filtros.value.nombre,
      apellido: this.filtros.value.apellido,
    };

    this.estudianteService.filtrolistEstudiantes(filtros).subscribe(data => {
      console.log(data);
      if( data.length != 0 ){
        this.haveEstudiantes= false;
        this.Estudiantes = data;
      }else{
        this.haveEstudiantes= true;
      }
      
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

  fichaEstudiante(idEstudiante: number){
    this.estudianteService.idEstudiante = idEstudiante;
    this.router.navigate(['/dashboard/festudiante'])
  }

  editarEstudiante(idEstudiante: number){
    this.estudianteService.idEstudiante = idEstudiante;
    this.router.navigate(['/dashboard/editarEstudiante'])
  }

  eliminarEstudiante(idEstudiante: number){
    console.log(idEstudiante);
    this.estudianteService.eliminarEstudiante(idEstudiante).subscribe(data => {
      console.log(data.message);
      if( data.message == "Usuario eliminado"){
        this.snackBar.open("Usuario Eliminado", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.listEstudiantes();
      }
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

  getColor(i: number) {
    if (i % 2 == 0) {
      return "#333333";
    } else{
      return "#091E0A";
    }
  }

  listClases(): void{
    this.router.navigate(['/dashboard/adminClases'])
  }

  logOut(): void{
    this.router.navigate(['/inicio'])
  }
}
