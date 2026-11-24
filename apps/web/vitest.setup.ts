import "@testing-library/jest-dom/vitest";

// Polyfills mínimos para jsdom: motion usa IntersectionObserver y matchMedia.
if (typeof window !== "undefined") {
  if (!("IntersectionObserver" in window)) {
    class IntersectionObserverMock implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds: ReadonlyArray<number> = [];

      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });
    Object.defineProperty(globalThis, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });
  }

  if (typeof window.matchMedia !== "function") {
    window.matchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener(): void {},
        removeEventListener(): void {},
        addListener(): void {},
        removeListener(): void {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  }
}
