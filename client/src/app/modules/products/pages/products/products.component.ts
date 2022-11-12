import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title: string = 'second'
  loading: boolean = false

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.productsService.getProducts().subscribe(res => {
      console.log(res);
      this.loading = false
    })
  }

  add() {
    this.router.navigate(['products/add'])
  }

}
