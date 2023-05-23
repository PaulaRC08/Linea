import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from 'src/app/models/cambiarPass';
import { RecuperarService } from 'src/app/services/recuperar.service';
import { PasswordStrengthValidator } from 'src/app/shared/Util/password-strength.validators';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent {
  hide = true;
  hidecon = true;
  
  urlTree;
  token;
  recuperar: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private recuperarService: RecuperarService) {

    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['t'];
    this.recuperar = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]],
      ConfPassword: ['', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]]
      }, { validator: this.checkPassword });

  };

  checkPassword(group: FormGroup): boolean {
    
    const pass = group.get('password')?.value;
    const confirmPass = group.get('ConfPassword')?.value;
    if(pass==confirmPass){
      return true;
    }else{
      return false;
    }
    
  }

  ngOnInit(): void{
    if(this.token == undefined){
      this.router.navigate(['/inicio'])
    }
  }

  cambiarPassword(): void{
    this.loading = true;
    if(this.checkPassword(this.recuperar)){

      const token: Token ={
        token: this.token,
        password: this.recuperar.value.password,
      };
      
      this.recuperarService.cambiarPass(token).subscribe(data => {
        console.log(data);
        if (data.message=="La password fue actualizada con exito!"){
          this.loading = false;
          this.router.navigate(['/inicio'])
          this.snackBar.open("Contraseña Actualizada", '',{
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        } else{
          this.loading = false;
          this.router.navigate(['/inicio'])
          this.snackBar.open("Error de token: Recupere contraseña nuevamente", '',{
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      }, error => {
        console.log(error);
        this.snackBar.open(" ERROR: "+ (error.error.message), '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      });
    }else{
      this.recuperar.reset();
      this.loading = false;
      this.snackBar.open(" Contraseñas Diferentes", '',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }

    


  }

}
