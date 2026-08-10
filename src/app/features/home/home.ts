import { Component } from '@angular/core';
import { AboutComponent } from '../about/about';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [AboutComponent],
})
export class Home {}
