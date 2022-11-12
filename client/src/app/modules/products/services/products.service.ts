import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { Observable, tap, catchError, throwError } from 'rxjs'
import { ErrorService } from '../../../shared/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  products: IProduct[] = []

  addedProduct: IProduct[] = []

  getProducts(): Observable<IProduct[]> {
    const api: string = 'https://fakestoreapi.com/products'
    return this.http.get<IProduct[]>(api).pipe(
      tap(products => {
        if(this.addedProduct.length !== 0) {
          this.products = [...this.addedProduct, ...products]
        } else {
          this.products= [...products]
        }
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  getOne(id: string | null): Observable<IProduct> {
    const api: string = `https://fakestoreapi.com/products/${id}`
    return this.http.get<IProduct>(api)
  }

  createProduct(product: IProduct) {
    const api: string = 'https://fakestoreapi.com/products'
    return this.http.post<IProduct>(api, product).pipe(
      tap(product => {
        this.addedProduct.unshift(product)
      })
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
