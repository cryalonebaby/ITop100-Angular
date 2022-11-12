import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SliceTextPipe implements PipeTransform {

  transform(text: string): string {
    if(text.length < 30) return text
    const arr = text.split(' ')
    const newArr = arr.slice(0, 4)
    return `${newArr.join(' ')}...`
  }

}
