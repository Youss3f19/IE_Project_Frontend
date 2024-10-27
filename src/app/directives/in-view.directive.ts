import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initObserver();
    window.addEventListener('scroll', this.onScroll); // Add scroll event listener
  }

  private initObserver() {
    // Define options for the observer
    const options = {
      root: null,
      threshold: 0.5 // Adjust this value for smoother animation triggering
    };

    // Callback for the observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a class for animation
          this.renderer.addClass(this.el.nativeElement, 'show');
        } else {
          // Remove the animation class
          this.renderer.removeClass(this.el.nativeElement, 'show');
        }
      });
    }, options);

    // Observe the element
    this.observer.observe(this.el.nativeElement);
  }

  private onScroll = () => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    // Check if the element is in view
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      this.renderer.addClass(this.el.nativeElement, 'show');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'show');
    }
  };

  ngOnDestroy() {
    // Disconnect the observer when the directive is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('scroll', this.onScroll); // Clean up the scroll event listener
  }
}
