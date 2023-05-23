import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable'
import { FiltroClase } from 'src/app/models/filtroClase';
import { ClasesService } from 'src/app/services/clases.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-admin-clases',
  templateUrl: './admin-clases.component.html',
  styleUrls: ['./admin-clases.component.scss']
})
export class AdminClasesComponent {
  filtros: FormGroup;
  Clases: any = [];
  haveClases = false;

  //PDF REPORT
  CabeceroClases: any = [["ID", "Nombre", "Codigo", "Creditos","Descripcion"]];
  TodosClases: any = [];
  TodosClasesOf: any = [];

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private clasesService: ClasesService){
      this.filtros = this.fb.group({
        codigo: ['',Validators.maxLength(15)],
        nombre: ['',Validators.maxLength(50)]
        });
  }

  ngOnInit(): void{
    this.listClases();
  }

  generarPDF(){
    this.TodosClasesOf.length = 0;
    var contador: number = 0;
    this.clasesService.getClases().subscribe(data => {
        console.log(data);
        if( data.length != 0 ){
          this.TodosClases = data;

          for(let clas of this.TodosClases){
            contador++;
            var st = [contador,clas.nombreclase,clas.codigo, clas.creditos,(clas.descripcion.substring(0, 50)+"...")];
            this.TodosClasesOf.push(st);
          }
      
          console.log(this.TodosClasesOf);
          var pdf = new jsPDF();
          var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
      
          pdf.setFontSize(20);
          pdf.text("REPORTE DE CLASES", pageWidth / 2, 10, {align: 'center'});
      
          autotable(pdf, {
            margin: { left: 10, right: 10, top: 20, bottom: 30 },
            head: this.CabeceroClases,
            body: this.TodosClasesOf,
            theme: 'grid',
            headStyles: {
              fillColor: [27, 94, 31]
            },
            didDrawCell: (data: { column: { index: any; }; }) => {
              console.log(data.column.index)
            }
          });
          pdf.output('dataurlnewwindow');
          pdf.save('ReporteClase.pdf');

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

  listClases():void{
    const filtros: FiltroClase ={
      codigo: '',
      nombre: ''
    };

    this.clasesService.filtrolistClases(filtros).subscribe(data => {
      
      if( data.length != 0 ){
        this.haveClases= false;
        this.Clases = data;
      }else{
        this.haveClases= true;
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
    const filtros: FiltroClase ={
      codigo: this.filtros.value.codigo,
      nombre: this.filtros.value.nombre
    };

    this.clasesService.filtrolistClases(filtros).subscribe(data => {
      //console.log(data);
      if( data.length != 0 ){
        this.haveClases= false;
        this.Clases = data;
      }else{
        this.haveClases= true;
      }
      
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }
  
  fichaEstudiante(idClase: number){
    this.clasesService.idClase = idClase;
    this.router.navigate(['/dashboard/fclase'])
  }
  
  editarEstudiante(idClase: number){
    this.clasesService.idClase = idClase;
    this.router.navigate(['/dashboard/editarClase'])
  }

  eliminarEstudiante(idEstudiante: number){
    console.log(idEstudiante);
    this.clasesService.eliminarClase(idEstudiante).subscribe(data => {
      console.log(data.message);
      if( data.message == "Usuario eliminado"){
        this.snackBar.open("Usuario Eliminado", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.listClases();
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

  listAlumnos(): void{
    this.router.navigate(['/dashboard/admin'])
  }

  logOut(): void{
    this.router.navigate(['/inicio'])
  }
}
