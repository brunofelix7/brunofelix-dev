import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[appFadeIn]',
    standalone: true
})
export class FadeInDirective implements OnInit {
    private distance: string = '30px';
    private duration: number = 600;

    @Input() public delay: number = 0;

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    public ngOnInit(): void {
        // Set initial state
        this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${this.distance})`);
        this.renderer.setStyle(this.element.nativeElement, 'transition', `opacity ${this.duration}ms ease-out ${this.delay}ms, transform ${this.duration}ms ease-out ${this.delay}ms`);

        // Create intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate in
                        this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
                        this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0)');

                        // Stop observing after animation
                        observer.unobserve(this.element.nativeElement);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Start observing
        observer.observe(this.element.nativeElement);
    }
}
