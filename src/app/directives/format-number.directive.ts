import { Directive, ElementRef, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[formatNumber]'
})

export class FormatNumberDirective implements OnInit {
  private inputElement: any;
  @Output() rawValue: EventEmitter<number>;

  constructor(
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe
  ) {
    this.inputElement = this.elementRef.nativeElement;
    this.rawValue = new EventEmitter();
  }

  ngOnInit(): void {
    // this.inputElement.value = 'yow';
  }

  @HostListener('keyup')
  onChange() {
    const numberValue = this.inputElement.value.replace(/\D/g, '');
    // console.log('value:', numberValue);
    this.rawValue.emit(+numberValue);
    this.inputElement.value = this.decimalPipe.transform(numberValue);
  }
}