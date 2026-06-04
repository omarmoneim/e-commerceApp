import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { AuthserviceService } from '../service/authservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputComponent,StepperModule,ButtonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
private readonly fb = inject(FormBuilder)
private readonly authserviceService = inject(AuthserviceService) 
private readonly cookieService = inject(CookieService) 
private readonly router = inject(Router) 

  step:number=1;
  verifyEmail!:FormGroup
  verifyCode!:FormGroup
  resetPassword!:FormGroup
  submitted:boolean=false


  ngOnInit(): void {
    this.initForm()
  }


  initForm():void{

    this.verifyEmail=this.fb.group({
      email:[null,[Validators.required , Validators.email]]
    })

    this.verifyCode =this.fb.group({
      resetCode:[null,[Validators.required ]]  })

      
    this.resetPassword=this.fb.group({
      email:[null,[Validators.required , Validators.email]],
      newPassword:[null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)]]
    })
  
  }

  formStep1():void{
    if(this.verifyEmail.valid){
      this.authserviceService.submitVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.submitted = true;
        this.step = 2;
      }
    })

    }
  }
  formStep2():void{
    this.submitted = false;
    if(this.verifyCode.valid){
      this.authserviceService.submitVerifyResetCode(this.verifyCode.value).subscribe({
      next:(res)=>{
          this.resetPassword.patchValue({
          email: this.verifyEmail.get('email')?.value
        });
        this.step = 3;
       this.submitted = true;
      }
    })

    }

  }
  formStep3():void{
    if(this.resetPassword.valid){
      this.authserviceService.submitVerifyResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.cookieService.set('token',res.token)
        this.router.navigate(['/home'])
      }
    })

    }

  }
}
