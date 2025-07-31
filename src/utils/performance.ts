// مجموعة من الأدوات لتحسين الأداء

import { useCallback, useRef, useEffect } from 'react';

// Debounce function لتقليل عدد الاستدعاءات
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function لتحديد معدل الاستدعاءات
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Hook لـ debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook لـ throttle
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T {
  const throttledCallback = useRef(throttle(callback, limit));
  
  useEffect(() => {
    throttledCallback.current = throttle(callback, limit);
  }, [callback, limit]);
  
  return throttledCallback.current as T;
}

// Lazy loading للصور
export function lazyLoadImage(
  src: string,
  placeholder?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// Hook لـ Intersection Observer
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
}

// تحسين localStorage
export const optimizedStorage = {
  set: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue || null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  },
};

// قياس الأداء
export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();

  static start(label: string): void {
    this.measurements.set(label, performance.now());
  }

  static end(label: string): number | null {
    const start = this.measurements.get(label);
    if (!start) return null;

    const duration = performance.now() - start;
    this.measurements.delete(label);
    
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  static measure<T>(label: string, fn: () => T): T {
    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  }

  static async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    const result = await fn();
    this.end(label);
    return result;
  }
}

// تحسين الذاكرة
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
}

// تنظيف الذاكرة
export function createLRUCache<K, V>(maxSize: number) {
  const cache = new Map<K, V>();
  
  return {
    get(key: K): V | undefined {
      const value = cache.get(key);
      if (value !== undefined) {
        // Move to end (most recently used)
        cache.delete(key);
        cache.set(key, value);
      }
      return value;
    },
    
    set(key: K, value: V): void {
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxSize) {
        // Remove least recently used (first item)
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    
    has(key: K): boolean {
      return cache.has(key);
    },
    
    delete(key: K): boolean {
      return cache.delete(key);
    },
    
    clear(): void {
      cache.clear();
    },
    
    get size(): number {
      return cache.size;
    },
  };
}

// Error boundary utilities
export function logError(error: Error, errorInfo?: any): void {
  console.error('🔥 Application Error:', error);
  
  if (errorInfo) {
    console.error('Error Info:', errorInfo);
  }
  
  // يمكن إضافة إرسال الأخطاء لخدمة مراقبة هنا
  // مثل Sentry أو LogRocket
}

// تحسين تحميل الصور
export function preloadImages(imageUrls: string[]): Promise<void[]> {
  const promises = imageUrls.map(url => lazyLoadImage(url));
  return Promise.all(promises).then(() => []);
}

// فحص سرعة الإنترنت
export function getConnectionSpeed(): string {
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return 'unknown';
  }
  
  const speed = connection.effectiveType;
  return speed || 'unknown';
}

// تحسين الخطوط
export function preloadFonts(fontFamilies: string[]): void {
  fontFamilies.forEach(fontFamily => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`;
    document.head.appendChild(link);
  });
}

// تنظيف المكونات
export function useCleanup(cleanup: () => void): void {
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
}

// استخدام الذاكرة
export function getMemoryUsage(): any {
  if ('memory' in performance) {
    return (performance as any).memory;
  }
  return null;
}

// Bundle analyzer simulation
export function analyzeBundleSize(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('📦 Bundle Analysis:');
    console.log('Use "npm run analyze" for detailed bundle analysis');
  }
}
