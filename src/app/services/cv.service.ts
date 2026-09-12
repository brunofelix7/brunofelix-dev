import { Injectable } from '@angular/core';
import { Language } from '../shared/enums';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  public getCvUrl(lang: string): string {
    const language = lang || Language.EN;
    return `assets/pdf/cv_${language}.pdf`;
  }
}
