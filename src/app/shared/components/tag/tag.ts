import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag.scss'],
  standalone: true,
})
export class TagComponent {
  @Input() label: string = '';
}
