import { Component, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about';
import { ProjectContainer } from '../project-container/project-container';
import { ScrollPositionService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [AboutComponent, ProjectContainer],
})
export class Home implements OnInit {
  constructor(private scrollPositionService: ScrollPositionService) {}

  public ngOnInit(): void {
    this.scrollPositionService.restoreScrollPosition();
  }
}
