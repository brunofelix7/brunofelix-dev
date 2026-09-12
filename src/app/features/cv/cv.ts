import { Component, OnInit, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CvService, TranslationService } from '../../services';
import { ContainerComponent } from '../../shared/components/container/container';
import { FadeInDirective } from '../../shared/animations/fade-in.directive';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-cv',
  imports: [ContainerComponent, FadeInDirective, SafeUrlPipe, TranslatePipe],
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
})
export class Cv implements OnInit {
  public cvAvailable = signal(true);

  public cvUrl = computed(() => this.cvService.getCvUrl(this.translationService.currentLang()));

  /* FitH makes the viewer zoom to the container width instead of shrinking the tall page to fit its height */
  public cvPreviewUrl = computed(() => `${this.cvUrl()}#view=FitH`);

  constructor(
    private cvService: CvService,
    private translationService: TranslationService
  ) {}

  public ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  public onPdfError(): void {
    this.cvAvailable.set(false);
  }
}
