import { GalleriaModule } from 'primeng/galleria';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from './service/product-details.service';
import { Products } from '../../core/models/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-details',
  imports: [GalleriaModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute =inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)
  private readonly cartService = inject(CartService)
  private readonly toast=inject( ToastrService)
  private readonly cookie = inject(CookieService)
  private readonly router = inject(Router)


  id:string|null=null;
  productDetails:Products={} as Products



  images: any[] = [];
  responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];




  ngOnInit(): void {
    this.getProductId()
    this.getProductDataDetails()

  }

  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.id=urlParams.get('id')

      }
    })
  }

  getProductDataDetails():void{
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next:(res)=>{
        this.productDetails=res.data;

         if (this.productDetails.images && Array.isArray(this.productDetails.images)) {
          this.images = this.productDetails.images.map((img: string) => ({
            itemImageSrc: img ||this.productDetails.imageCover,
            thumbnailImageSrc: img,
            alt: this.productDetails.title,
            title: this.productDetails.title,
          }));
        }
      },
      error:(err)=>{
      }


    })
  }


  AddItemToCart(id:string):void{
    if(this.cookie.get('token')){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status === "success"){
        this.toast.success(res.message,"Fresh Cart")
      }


      },
      error:(err)=>{
        this.toast.error('Failed Request',"Fresh Cart")
      }
    })
  }
  else{
            this.toast.error('You Must Login First',"Fresh Cart")

    this.router.navigate(['/login']);
  }

  }
}
