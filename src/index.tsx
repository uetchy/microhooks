import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import load from 'load-asset';

export function useDeferredState<T>(
  duration: number,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [response, setResponse] = useState<T>(initialValue);
  const [innerValue, setInnerValue] = useState<T>(initialValue);

  useEffect(() => {
    const fn = setTimeout(() => {
      setResponse(innerValue);
    }, duration);

    return () => {
      clearTimeout(fn);
    };
  }, [duration, innerValue]);

  return [response, setInnerValue];
}

export function useTakeEffect(
  fn: () => void | (() => void),
  deps: React.DependencyList
) {
  useEffect(() => {
    if (deps.some(d => d === undefined || d === null)) return;
    const destructor = fn();
    return () => {
      destructor && destructor();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

interface Asset {
  [key: string]: string;
}

export function usePrefetch(assets: Asset[]): void {
  useEffect((): void => {
    load.all(assets);
  }, [assets]);
}

export interface Bounds {
  width: number;
  height: number;
}

/**
 * const {width, height} = useBounds();
 *
 * @export
 * @returns {Bounds}
 */
export function useWindowBounds(): Bounds {
  const [bounds, setBounds] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setBounds({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return bounds;
}

export function useInlineSVG(
  svgString: string,
  styles = {}
): () => React.ReactNode {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.innerHTML = svgString;
    }
  }, []);

  const render = () => <div style={styles} ref={svgContainerRef} />;
  return render;
}
