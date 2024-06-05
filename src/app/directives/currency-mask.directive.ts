import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[backofficeCurrencyMask]'
})
export class CurrencyMaskDirective {
  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef
  ) {
    this.el = elementRef.nativeElement;
  }

  @HostListener('blur', ['$event.target.value'])
  formatCurrency(value: string): void {
    if (value) {
      const parsedValue = parseFloat(value.replace(/\D/g, ''));
    const formattedValue = parsedValue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    this.el.value = formattedValue;
    }
  }

  @HostListener('focus', ['$event.target.value'])
  parseCurrency(value: string): void {
    if (value) {
      const parsedValue = parseFloat(value.replace(/\D/g, ''));
      this.el.value = parsedValue.toFixed(2);
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
    const char = event.key;
    if (allowedKeys.includes(char)) {
      return true;
    }
    return false;
  }
}
