/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";

function debounce<T extends (..._args: any[]) => any>(
    func: T,
    wait: number,
    callback?: (result: ReturnType<T>) => void
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return function (this: any, ...args: any) {
        const later = () => {
            timeoutId = undefined;
            const result = func.apply(this, args);
            callback && callback(result);
        };
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
    };
}

export function useDebounce<T extends (..._args: any[]) => any>(
    func: T,
    wait: number,
    callback?: (result: ReturnType<T>) => void
): (...args: Parameters<T>) => void;
export function useDebounce<T extends (..._args: any[]) => any>(
    func: T | undefined,
    wait: number,
    callback?: (result: ReturnType<T>) => void
): ((...args: Parameters<T>) => void) | undefined;
export function useDebounce<T extends (..._args: any[]) => any>(
    func: T | undefined,
    wait: number,
    callback?: (result: ReturnType<T>) => void
) {
    return useMemo(() => {
        if (func === undefined) return undefined;
        return debounce(func, wait, callback);
    }, [func, wait, callback]);
}
