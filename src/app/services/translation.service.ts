import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, signal, WritableSignal } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Language } from '../shared/enums';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly currentLangSignal = signal<string>(Language.EN);

  constructor(
    private readonly translate: TranslateService,
    private readonly http: HttpClient
  ) {
    this.translate.addLangs([Language.EN, Language.ES, Language.PT_BR]);
    this.translate.setDefaultLang(Language.EN);

    const savedLang = this.getSavedLanguage();
    this.loadTranslations(savedLang);

    this.translate.onLangChange.subscribe(event => {
      this.currentLangSignal.set(event.lang);
    });
  }

  public switchLanguage(lang: string): void {
    this.saveLanguage(lang);
    this.loadTranslations(lang);
  }

  public get currentLang(): WritableSignal<string> {
    return this.currentLangSignal;
  }

  public get currentLangValue(): string {
    const value = this.currentLang();
    return typeof value === 'string' ? value : Language.EN;
  }

  public get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translate.onLangChange;
  }

  private loadTranslations(lang: string): void {
    this.http.get(`i18n/${lang}.json`).subscribe((translations) => {
      this.translate.setTranslation(lang, translations, true);
      this.translate.use(lang);
      this.currentLangSignal.set(lang);
    });
  }

  private getSavedLanguage(): string {
    return localStorage.getItem('preferred-language') || Language.EN;
  }

  private saveLanguage(lang: string): void {
    try {
      localStorage.setItem('preferred-language', lang);
    } catch {
      console.warn('Could not save language preference to localStorage');
    }
  }
}
