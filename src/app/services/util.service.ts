import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() { }

  formatNumber(num: number): string {
    return num && num > 0 ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : '-';
  }

  prettyPrice(price: number): string {
    return `Rp${this.formatNumber(price)}.00`;
  }

  prettyPriceWithoutCurrency(price: number): string {
    return `${this.formatNumber(price)}`;
  }

  isEven(n: number): boolean {
    return n % 2 === 0;
  }

  isCardMinimalHeight(): boolean {
    const element = document.querySelectorAll('.menu-content-wrapper')[0];
    const height = element ? element.clientHeight : 0;
    return height === 592;
  }
}
