import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initObserver();
  }

  private initObserver() {
    // Définir les options de l'observer
    const options = {
      root: null,
      threshold: 0.1
    };

    // Callback de l'observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'show'); // Ajoute la classe d'animation
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'show'); // Retire la classe d'animation
        }
      });
    }, options);

    // Observer l'élément
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    // Déconnecter l'observer lorsque la directive est détruite
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
