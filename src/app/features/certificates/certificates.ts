import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContainerComponent } from '../../shared/components/container/container';
import { FadeInDirective } from '../../shared/animations/fade-in.directive';
import { CertificateCarousel } from '../certificate-carousel/certificate-carousel';

@Component({
  selector: 'app-certificates',
  imports: [ContainerComponent, CertificateCarousel, FadeInDirective, TranslatePipe],
  templateUrl: './certificates.html',
  styleUrl: './certificates.scss',
})
export class Certificates implements OnInit {
  public ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
