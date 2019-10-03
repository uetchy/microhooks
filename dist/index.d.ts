import * as React from 'react';
export declare function useDeferredState<T>(duration: number, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>];
export declare function useTakeEffect(fn: () => void | (() => void), deps: React.DependencyList): void;
interface Asset {
    [key: string]: string;
}
export declare function usePrefetch(assets: Asset[]): void;
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
export declare function useWindowBounds(): Bounds;
export declare function useInlineSVG(svgString: string, styles?: {}): () => React.ReactNode;
export {};
