import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule, FormBuilder } from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, ɵInternalFormsSharedModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

private readonly authserviceService = inject(AuthserviceService)
private readonly router = inject(Router)
private readonly fb  = inject(FormBuilder)
private readonly cookieService  = inject(CookieService)

errMessage:string="";
successMessage:string="";
isLoading:boolean = false;
loginForm!:FormGroup
subscription:Subscription =new Subscription()

ngOnInit(): void {
  this.initForm()
}

initForm():void{
 this.loginForm = this.fb.group({
  email:[null,[Validators.required, Validators.email]],
  password:[null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)]]
})

// loginForm:FormGroup = new FormGroup({
//   email:new FormControl(null,[Validators.required, Validators.email]),
//   password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)])
// } );

}

submitForm():void{
  if(this.loginForm.valid){
    this.isLoading = true;
        this.subscription.unsubscribe()

    //? LOGIC call API
  this.subscription = this.authserviceService.loginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        if(res.message==="success"){
        this.errMessage="";
        this.successMessage =res.message ;
        this.cookieService.set('token' , res.token)
        //! UserID Logic
        this.cookieService.set('userId' , this.authserviceService.decodeToken().id)




          //~ Navigate to Login
          setTimeout( ()=>{
            this.router.navigate(['/home']);
            this.successMessage ="";
          },1500      )
        }
        this.isLoading=false;
      },
      error:(err)=>{
       this.errMessage = err.error.message
       this.isLoading=false;
      }
    })
  }
  else{
    this.loginForm.markAllAsTouched()
  }

}

}
