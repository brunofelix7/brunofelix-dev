import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.html',
  styleUrls: ['./image-modal.scss'],
  standalone: true,
})
export class ImageModal implements OnChanges, OnDestroy {
  @Input() public isOpen = false;
  @Input() public src = '';
  @Input() public alt = '';
  @Input() public closeLabel = 'Close';
  @Output() public closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  public onEscapeKey(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  public ngOnChanges(): void {
    this.lockPageScroll(this.isOpen);
  }

  public ngOnDestroy(): void {
    this.lockPageScroll(false);
  }

  public close(): void {
    this.closed.emit();
  }

  private lockPageScroll(locked: boolean): void {
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
