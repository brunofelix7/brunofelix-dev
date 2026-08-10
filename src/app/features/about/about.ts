import { Component } from '@angular/core';
import { TagComponent } from '../../shared/components/tag/tag';
import { FadeInDirective } from '../../shared/animations/fade-in.directive';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ContainerComponent } from '../../shared/components/container/container';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  standalone: true,
  imports: [TagComponent, FadeInDirective, TranslatePipe, ContainerComponent],
})
export class AboutComponent {}
