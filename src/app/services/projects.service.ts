import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { Project } from '../shared/models';
import { TranslationService } from './translation.service';
import { Language, Util } from '../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient, private translationService: TranslationService) { }

  private get projectsUrl(): string {
    const lang = this.translationService.currentLangValue || Language.EN;
    return `projects/${lang}.json`;
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  public getProjectById(id: string): Observable<Project | undefined> {
    return this.getProjects().pipe(
      take(Util.DEFAULT_TAKE),
      map(projects => projects.find(p => p.id === id))
    );
  }
}
