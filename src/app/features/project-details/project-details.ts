import { Component, OnInit, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs';
import { Project } from '../../shared/models';
import { Util } from '../../shared/enums';
import { ProjectsService, TranslationService } from '../../services';
import { ContainerComponent } from '../../shared/components/container/container';
import { TagComponent } from '../../shared/components/tag/tag';
import { FadeInDirective } from '../../shared/animations/fade-in.directive';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-project-details',
  imports: [ContainerComponent, TagComponent, FadeInDirective, SafeUrlPipe, TranslatePipe],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails implements OnInit {
  private currentProjectId = signal<string | null>(null);

  public project = signal<Project | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private projectsService: ProjectsService,
    private translationService: TranslationService
  ) {
    effect(() => {
      const projectId = this.currentProjectId();
      const currentLang = this.translationService.currentLang();
      if (projectId && currentLang) {
        this.loadProject(projectId);
      }
    });
  }

  public get hasProjectLinks(): boolean {
    const project = this.project();
    return !!project?.sourceUrl || !!project?.liveUrl || !!project?.downloadUrl;
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(take(Util.DEFAULT_TAKE))
      .subscribe((params) => this.currentProjectId.set(params['id']));
  }

  public goBack(): void {
    this.location.back();
  }

  private loadProject(projectId: string): void {
    this.projectsService.getProjectById(projectId)
      .pipe(take(Util.DEFAULT_TAKE))
      .subscribe({
        next: (project) => {
          if (project) {
            this.project.set(project);
            window.scrollTo(0, 0);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Error loading project:', error);
          this.router.navigate(['/home']);
        }
      });
  }
}
