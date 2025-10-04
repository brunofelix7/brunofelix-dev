import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { Language } from '../../../shared/enums/language.enum';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavBar {

  private currentLangSignal = signal<string>('');
  public isMobileMenuOpen = false;
  public languages = [
    { code: Language.EN, label: 'EN' },
    { code: Language.ES, label: 'ES' },
    { code: Language.PT_BR, label: 'PT-BR' },
  ];

  constructor() {
    // Implement translation service
  }

  public switchLanguage(lang: string): void {
      console.log('switchLanguage()');
  }

  public isLangActive(lang: string): boolean {
    return false;
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
