import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLabelBlurCrutch]',
})
export class LabelBlurCrutchDirective {
  constructor(private element: ElementRef) {}

  @HostListener('blur') onBlur(): void {
    const contentEditable = this.element.nativeElement,
      label = contentEditable.previousElementSibling;

    if (contentEditable.textContent) {
      label.classList.add('focused-label-state');
    } else {
      label.classList.remove('focused-label-state');
    }
  }
}
