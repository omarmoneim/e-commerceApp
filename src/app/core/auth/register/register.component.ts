import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, ɵInternalFormsSharedModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

private readonly authserviceService = inject(AuthserviceService)
private readonly router = inject(Router);
private readonly fb = inject(FormBuilder);
subscription:Subscription =new Subscription()

errMessage:string="";
successMessage:string="";
isLoading:boolean = false;
registerForm!:FormGroup


 ngOnInit(): void {
   this.initForm()
 }

initForm():void{
   this.registerForm = this.fb.group({
  name:[null,[Validators.required,Validators.minLength(3), Validators.maxLength(20)]],
  email:[null,[Validators.required, Validators.email]],
  password:[null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)]] ,
  rePassword:[null,[Validators.required]] ,
  phone :[null,[Validators.required,Validators.pattern(/^01[0125][\d]{8}$/)]]
} ,{validators:this.confirmPassword} )

//   registerForm:FormGroup = new FormGroup({
//   name:new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
//   email:new FormControl(null,[Validators.required, Validators.email]),
//   password:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)]) ,
//   rePassword:new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)]) ,
//   phone :new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][\d]{8}$/)])
// } , {validators:this.confirmPassword});
}

// ^ Custom validation
confirmPassword(group:AbstractControl){

  //! (parameter) group  holds form (registerForm)

//  return group.get('password')?.value === group.get('rePassword')?.value ? null : {misMatch:true}

  let password =group.get('password')?.value
  let rePassword = group.get('rePassword')?.value
  if(password === rePassword){
    return null
  }
  else{
    group.get("rePassword")?.setErrors({mismatch:true})
    return {mismatch:true}
  }
}

submitForm():void{
  if(this.registerForm.valid){
    this.subscription.unsubscribe()
    this.isLoading = true;
    //? LOGIC call API
  this.subscription=  this.authserviceService.registerForm(this.registerForm.value).subscribe({
      next:(res)=>{
        if(res.message==="success"){
        this.errMessage="";
        this.successMessage =res.message ;

        //~ Navigate to Login
          setTimeout( ()=>{
            this.router.navigate(['/login']);
            this.successMessage ="";

          },1500 )
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
    //! Show all errors
    this.registerForm.markAllAsTouched()

    //! show error in rePassword
    // this.registerForm.get('rePassword')?.patchValue('')
    // & another syntax
    // this.registerForm.setErrors({misMatch:true})
  }

}
}
