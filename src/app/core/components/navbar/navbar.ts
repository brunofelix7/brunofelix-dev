import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { Language } from '../../../shared/enums';
import { TranslationService } from '../../../services';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavBar {

  private currentLangSignal = signal<string>('');
  public isMobileMenuOpen = false;
  public languages = [
    { code: Language.EN, label: 'EN', icon: 'assets/icons/en-flag.svg' },
    { code: Language.ES, label: 'ES', icon: 'assets/icons/es-flag.svg' },
    { code: Language.PT_BR, label: 'PT-BR', icon: 'assets/icons/pt-br-flag.svg' },
  ];

  constructor(private readonly translationService: TranslationService) {
    this.currentLangSignal.set(this.translationService.currentLang());

    effect(() => {
      this.currentLangSignal.set(this.translationService.currentLang());
    });
  }

  public switchLanguage(lang: string): void {
    this.translationService.switchLanguage(lang);
  }

  public isLangActive(lang: string): boolean {
    return this.currentLangSignal() === lang;
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
