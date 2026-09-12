import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../shared/models';
import { TagComponent } from '../../shared/components/tag/tag';

@Component({
  selector: 'app-project-card',
  imports: [TagComponent],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  @Input() public project!: Project;
  @Output() public cardClick = new EventEmitter<Project>();

  public onCardClick(): void {
    this.cardClick.emit(this.project);
  }
}
