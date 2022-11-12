import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/modules/products/models/product';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    private router: Router
  ) { }

  product: IProduct | undefined

  ngOnInit(): void {
    
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    let currItem
    if(id)
      currItem = this.productsService.products.find(prod => prod.id === +id)
    if(currItem) {
      this.product = currItem
    } else {
      this.productsService.getOne(id).subscribe(res => {
        if(!res) {
          this.router.navigate([''])
        }
        this.product = res        
      })
    }
  }

}
