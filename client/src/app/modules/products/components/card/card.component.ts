import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/modules/products/models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string = 'first'
  @Input() image: string = ''
  @Input() id: number | undefined = 0
  @Input() price: number | undefined = 0

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detailPage(id: number | undefined) {
    if(id)
      this.router.navigate([`/product/${id}`])
  }

}
