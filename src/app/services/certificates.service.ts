import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../shared/models';
import { TranslationService } from './translation.service';
import { Language } from '../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  constructor(private http: HttpClient, private translationService: TranslationService) { }

  private get certificatesUrl(): string {
    const lang = this.translationService.currentLangValue || Language.EN;
    return `certificates/${lang}.json`;
  }

  public getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.certificatesUrl);
  }
}
