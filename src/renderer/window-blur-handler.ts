/**
 * Window Blur Handler
 * Window closes only via Esc key — outside clicks do not close the window.
 */

export class WindowBlurHandler {
  public setDomManager(_domManager: { isDraggable(): boolean }): void {
    // No-op: blur-based hide is disabled
  }

  public setSuppressBlurHide(_value: boolean): void {
    // No-op: blur-based hide is disabled
  }

  public async handleWindowBlur(): Promise<void> {
    // Intentionally do nothing: window is closed only by Esc key (ShortcutHandler)
  }
}
