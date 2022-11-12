import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/modules/products/models/product';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private location: Location
  ) { }

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  isErrors = this.title.errors

  get title() {
    return this.form.controls.title as FormControl
  }

  get price() {
    return this.form.controls.price as FormControl
  }

  get category() {
    return this.form.controls.category as FormControl
  }

  get description() {
    return this.form.controls.description as FormControl
  }

  ngOnInit(): void {
    console.log(this.productsService.products);
  }

  create() {
    const rating = {
      rate: 0,
      count: 0
    }
    const newProduct: IProduct = {
      title: this.title.value,
      price: this.price.value,
      description: this.description.value,
      category: this.category.value,
      rating: {
        rate: 0,
        count: 0
      },
      image: 'https://i.pravatar.cc'
    }
    this.productsService.createProduct(newProduct).subscribe(res => {
      this.router.navigate([''])
    })
  }

}
