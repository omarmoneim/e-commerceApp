import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly router = inject(Router)
  id:string|null = null
  checkoutForm!:FormGroup
  isVisa:boolean=false
  isCash:boolean=false
  isLoading:boolean=false



  ngOnInit(): void {
    this.formInit()
    this.getCartId()

  }

  formInit():void{
    this.checkoutForm = this.fb.group({
      shippingAddress:this.fb.group({
        details:[null,[Validators.required]],
        phone:[null,[Validators.pattern(/^01[0125][\d]{8}$/)]],
        city:[null,Validators.required]
      })

    })

  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.id=urlParams.get('id')
      },
      error:(err)=>{


      }
    })
  }

  submitFormCash():void{
    if(this.checkoutForm.valid){
      console.log(this.checkoutForm.value);
      this.isCash=true
      console.log("From cash");
      this.cartService.checkoutCashSession(this.id,this.checkoutForm.value).subscribe({
        next:(res)=>{
            console.log(res)
            if(res.status =='success'){
              this.router.navigate(['/allorders'])
              }

        },
        error:(err)=>{


        }
      })


    }else{
      console.log('ERROR FROM CHECK FORM');

    }


  }
  submitFormVisa():void{
    if(this.checkoutForm.valid){
      console.log(this.checkoutForm.value);
            this.isVisa=true
            this.isLoading =true
            console.log("From visa");
            this.cartService.checkoutSession(this.id,this.checkoutForm.value).subscribe({
              next:(res)=>{
               if(res.status =='success'){
               this.isLoading =false
               window.open(res.session.url,'_self')
               }
              },
              error:(err)=>{


              }
            })


    }else{
      console.log('ERROR FROM visa FORM');

    }


  }
}
