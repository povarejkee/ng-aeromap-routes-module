import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLabelClickCrutch]',
})
export class LabelClickCrutchDirective {
  constructor(private element: ElementRef) {}

  @HostListener('click') onLabelClick(): void {
    this.element.nativeElement.nextElementSibling.focus();
  }
}
