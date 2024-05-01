import { Directive, ElementRef, Input, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appImageRotator]'
})
export class ImageRotatorDirective implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  private intervalId: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.images.length > 1) {
      this.startRotation();
    }
  }

  ngOnDestroy() {
    this.stopRotation();
  }

  private startRotation() {
    let currentImageIndex = 0;
    const imageElement = this.elementRef.nativeElement;
    this.intervalId = setInterval(() => {
      const imageUrl = this.images[currentImageIndex];
      this.renderer.setAttribute(imageElement, 'src', imageUrl);
      currentImageIndex = (currentImageIndex + 1) % this.images.length;
    }, 4000); // Rotate every 4 seconds
  }

  private stopRotation() {
    clearInterval(this.intervalId);
  }
}
