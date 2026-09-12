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
    // The saved position is consumed once, so only the navigation that saved it
    // is restored. Any other way back to the home page starts at the top.
    const savedPosition = this.homePageScrollPosition;
    this.resetPosition();

    if (savedPosition > 0) {
      // Use setTimeout to ensure the page has loaded
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }

  public resetPosition(): void {
    this.homePageScrollPosition = 0;
  }
}
