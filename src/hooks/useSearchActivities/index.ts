import { useMemo } from "react";
import { options } from "./constants";


export const useSearchActivites = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return useMemo(() => {
        const mappedOptions = options.map((option) => option.label + " - " + option.category)
        if (lowerCaseSearchTerm === "") {
            return mappedOptions;
        }
        const searchTerms = lowerCaseSearchTerm.split(" ");
        const relevantOptions = [...mappedOptions.filter((label) => searchTerms.some((term) => label.toLowerCase().includes(term)))]
        return relevantOptions;
    }, [lowerCaseSearchTerm]);
}


