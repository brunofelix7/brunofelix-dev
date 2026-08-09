import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavBar, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
