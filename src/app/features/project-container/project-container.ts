import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../shared/models';
import { ProjectsService } from '../../services';
import { ScrollPositionService } from '../../services';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services';
import { take, finalize } from 'rxjs';
import { Util } from '../../shared/enums';
import {FadeInDirective} from '../../shared/animations/fade-in.directive';
import {ContainerComponent} from '../../shared/components/container/container';
import {ProjectCard} from '../project-card/project-card';

@Component({
  selector: 'app-project-container',
  imports: [TranslatePipe, ContainerComponent, ProjectCard, FadeInDirective],
  templateUrl: './project-container.html',
  styleUrl: './project-container.scss',
})
export class ProjectContainer implements OnInit{
  public projects = signal<Project[]>([]);
  public loading = signal(true);

  public hasProjects = computed(() => {
    const projects = this.projects();
    return !!projects && projects.length > 0;
  });

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private scrollPositionService: ScrollPositionService,
    private translationService: TranslationService
  ) {
    effect(() => {
      const currentLang = this.translationService.currentLang();
      if (currentLang) {
        this.loadProjects();
      }
    });
  }

  public ngOnInit(): void {
    this.loadProjects();
  }

  public onProjectClick(project: Project): void {
    this.scrollPositionService.saveCurrentPosition();
    this.router.navigate(['/projects', project.id]);
  }

  public trackByProject(index: number, project: Project): string {
    return project.id;
  }

  private loadProjects(): void {
    this.loading.set(true);
    this.projectsService.getProjects()
      .pipe(
        take(Util.DEFAULT_TAKE),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (projects) => {
          this.projects.set(projects);
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.projects.set([]);
        }
      });
  }
}
