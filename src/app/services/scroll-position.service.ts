import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollPositionService {
  private homePageScrollPosition: number = 0;

  public saveCurrentPosition(): void {
    this.homePageScrollPosition = window.scrollY;
  }

  public restoreScrollPosition(): void {
    if (this.homePageScrollPosition > 0) {
      // Use setTimeout to ensure the page has loaded
      setTimeout(() => {
        window.scrollTo(0, this.homePageScrollPosition);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }

  public resetPosition(): void {
    this.homePageScrollPosition = 0;
  }
}
