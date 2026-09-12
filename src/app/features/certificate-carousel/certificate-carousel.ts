import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize, take } from 'rxjs';
import { Certificate } from '../../shared/models';
import { Util } from '../../shared/enums';
import { CertificatesService, TranslationService } from '../../services';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-certificate-carousel',
  imports: [SafeUrlPipe, TranslatePipe],
  templateUrl: './certificate-carousel.html',
  styleUrl: './certificate-carousel.scss',
})
export class CertificateCarousel implements OnInit {
  public certificates = signal<Certificate[]>([]);
  public currentIndex = signal(0);
  public loading = signal(true);

  public currentCertificate = computed<Certificate | null>(() => {
    const certificates = this.certificates();
    return certificates[this.currentIndex()] ?? null;
  });

  public hasManyCertificates = computed(() => this.certificates().length > 1);

  constructor(
    private certificatesService: CertificatesService,
    private translationService: TranslationService
  ) {
    effect(() => {
      const currentLang = this.translationService.currentLang();
      if (currentLang) {
        this.loadCertificates();
      }
    });
  }

  public ngOnInit(): void {
    this.loadCertificates();
  }

  public previous(): void {
    const total = this.certificates().length;
    this.currentIndex.set((this.currentIndex() - 1 + total) % total);
  }

  public next(): void {
    const total = this.certificates().length;
    this.currentIndex.set((this.currentIndex() + 1) % total);
  }

  public goToSlide(index: number): void {
    this.currentIndex.set(index);
  }

  private loadCertificates(): void {
    this.loading.set(true);
    this.certificatesService.getCertificates()
      .pipe(
        take(Util.DEFAULT_TAKE),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (certificates) => {
          this.certificates.set(certificates);
          this.currentIndex.set(0);
        },
        error: (error) => {
          console.error('Error loading certificates:', error);
          this.certificates.set([]);
        }
      });
  }
}
