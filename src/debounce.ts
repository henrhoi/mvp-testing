 
/* eslint-disable @typescript-eslint/no-explicit-any */

import { debounce } from "@mui/material";
import { useMemo } from "react";

export function useDebounce<T extends (..._args: any[]) => any>(
    func: T,
    wait: number,
) {
    return useMemo(() => {
        return debounce(func, wait);
    }, [func, wait]);
}
